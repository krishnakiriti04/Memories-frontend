import React,{useState, useEffect} from 'react';
import ChatList from "./chatlist/ChatList";
import {useHistory} from "react-router-dom";
// import useStyles from "./styles";
// import Button from "@material-ui/core/Button";
import firebase from "firebase";
import ChatView from "./chatview/ChatView";
import ChatTextBox from "./chattextbox/ChatTextBox";
import NewChat from "./newchat/NewChat";
import Navbar from "../navbar/Navbar";

const Chat = () => {

    const [email,setEmail] = useState(null);
    const [selectedChat,setSelectedChat] = useState(null);
    const [newChatFormVisible,setNewChatFormVisible] = useState(null);
    const [chats,setChats] = useState([]);
    const [username,setUsername] = useState(null);
    const history = useHistory();

    // const classes = useStyles();

    const newChatBtnClicked = () =>{
        setNewChatFormVisible(true)
        setSelectedChat(null)
    }        

    const clickedChatByNotSender = (chatIndex) => {
        return chats[chatIndex].messages[chats[chatIndex].messages.length-1].sender !== email
    }

    
    //function to get Document Key which is in the format user1:user2 (in alphabatical order)
    const getDocKey = (friendsEmail) => {
        return [email,friendsEmail].sort().join(":");
    }

    const messageRead = (chatIndex) => {
        // const chatIndex = selectedChat;
        const dockey = getDocKey(chats[chatIndex].users.filter(_usr=> _usr.email !== email)[0].email)
        if(clickedChatByNotSender(chatIndex)){
            firebase
                .firestore()
                .collection("chats")
                .doc(dockey)
                .update({ receiverHasRead : true})
        }
    }

    const selectChat = (chatIndex) => {
        setNewChatFormVisible(false)
        setSelectedChat(chatIndex);
        messageRead(chatIndex);
    }

    const submitMessageFn = (chatMessage,chatindex) => {
        if(selectedChat!==null || chatindex >=0){
            const docKey =  getDocKey(chats[chatindex>=0 ? chatindex : selectedChat].users.filter(_usr => _usr.email !== email)[0].email) 
            firebase
                .firestore()
                .collection("chats")
                .doc(docKey)
                .update({
                    messages : firebase.firestore.FieldValue.arrayUnion({
                    message : chatMessage,
                    sender : email,
                    timestamp : Date.now()
                    }),
                    receiverHasRead : false
                })
        }
    }

    const userClickedInputFn = () => {
        // console.log("user clicked on input");
        messageRead(selectedChat);
    }

    //dockey is coming from NewChat component
    const goToChat = async (dockey,message) => {
        const existingchat = await firebase.firestore().collection("chats").where('users',"array-contains",{email,username}).get();
        const chatindex = existingchat.docs.findIndex(_doc=>_doc.id === dockey );
        setSelectedChat(chatindex);
        setNewChatFormVisible(false);
        if(message){
            submitMessageFn(message,chatindex)
        }    
    }

    //dockey is coming from NewChat component
    const createChat = async (dockey,message, friendsEmail,friendsUsername) => {
        await firebase.firestore().collection("chats").doc(dockey).set({
            messages:[{
                message:message,
                sender: email
            }],
            users:[{email,username},{email:friendsEmail,username:friendsUsername}],
            receiverHasRead : false,
        })
        //after creating we need to open the created chat
        goToChat(dockey);
    }

    useEffect(()=>{
        firebase
            .auth()
            .onAuthStateChanged(async _usr => {
                if(!_usr){
                    history.push("/login");
                }else{
                    setUsername(_usr.displayName);
                    await firebase
                            .firestore()
                            .collection("chats")
                            .where('users',"array-contains",{email:_usr.email,username:_usr.displayName})
                            .onSnapshot(async res=>{
                                const chatsArr = res.docs.map(_doc=>_doc.data());
                                await setEmail(_usr.email);
                                await setChats(chatsArr);
                            })
                }
            })
    },[history])

    return (
        <>
        <Navbar loggedUser={username}></Navbar>
        <div>
            <ChatList 
            newChatBtnFn = {newChatBtnClicked}
            selectChatFn = {selectChat}
            chats = {chats}
            userEmail = {email}
            loggedUser = {username}
            selectedChatIndex = {selectedChat}
            >
            </ChatList>
            {
                newChatFormVisible ? null : 
                (<ChatView userEmail = {email}
                    loggedUser = {username}
                    chats = {chats[selectedChat]}
                ></ChatView>)
            }
            {
                (!newChatFormVisible && selectedChat !== null) ? <ChatTextBox submitMessageFn = {submitMessageFn} userClickedInputFn = {userClickedInputFn}></ChatTextBox> : null
            }
            {
                newChatFormVisible ? <NewChat loggedUser={email} goToChat={goToChat} createChat={createChat}></NewChat> : null
            }
            {/* <Button className={classes.signOutBtn} variant="contained" onClick={signOutFn} >Sign Out</Button> */}
        </div>
        </>
    )
}

export default Chat
