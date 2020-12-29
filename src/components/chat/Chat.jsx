import React,{useState, useEffect} from 'react';
import ChatList from "./chatlist/ChatList";
import {useHistory} from "react-router-dom";
import useStyles from "./styles";
import Button from "@material-ui/core/Button";
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
    const history = useHistory();

    const classes = useStyles();

    const newChatBtnClicked = () =>{
        setNewChatFormVisible(true)
        setSelectedChat(null)
    }        

    const clickedChatByNotSender = (chatIndex) => {
        return chats[chatIndex].messages[chats[chatIndex].messages.length-1].sender !== email
    }

    const messageRead = (chatIndex) => {
        // const chatIndex = selectedChat;
     
        const dockey = getDocKey(chats[chatIndex].users.filter(_usr=> _usr !== email)[0])
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

    const signOutFn = () => firebase.auth().signOut()

    const submitMessageFn = (chatMessage) => {
        const docKey = getDocKey(chats[selectedChat].users.filter((_usr)=> _usr !== email)[0])
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

    //function to get Document Key which is in the format user1:user2 (in alphabatical order)
    const getDocKey = (friendsEmail) => {
        return [email,friendsEmail].sort().join(":");
    }

    const userClickedInputFn = () => {
        // console.log("user clicked on input");
        messageRead(selectedChat);
    }

    //dockey is coming from NewChat component
    const goToChat = async (dockey,message) => {
        const existingchat = await firebase.firestore().collection("chats").get()
        const chatindex = existingchat.docs.findIndex(_doc=>_doc.id === dockey )
        setSelectedChat(chatindex);
        setNewChatFormVisible(false);
        submitMessageFn(message);
    }

    //dockey is coming from NewChat component
    const createChat = async (dockey,message, friendsEmail) => {
        await firebase.firestore().collection("chats").doc(dockey).set({
            messages:[{
                message:message,
                sender: email
            }],
            users:[email,friendsEmail],
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
                    await firebase
                            .firestore()
                            .collection("chats")
                            .where('users',"array-contains",_usr.email)
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
        <Navbar></Navbar>
        <div>
            <ChatList 
            newChatBtnFn = {newChatBtnClicked}
            selectChatFn = {selectChat}
            chats = {chats}
            userEmail = {email}
            selectedChatIndex = {selectedChat}
            >
            </ChatList>
            {
                newChatFormVisible ? null : 
                (<ChatView userEmail = {email}
                    chats = {chats[selectedChat]}
                ></ChatView>)
            }
            {
                (!newChatFormVisible && selectedChat !== null) ? <ChatTextBox submitMessageFn = {submitMessageFn} userClickedInputFn = {userClickedInputFn}></ChatTextBox> : null
            }
            {
                newChatFormVisible ? <NewChat goToChat={goToChat} createChat={createChat}></NewChat> : null
            }
            <Button className={classes.signOutBtn} variant="contained" onClick={signOutFn} >Sign Out</Button>
        </div>
        </>
    )
}

export default Chat
