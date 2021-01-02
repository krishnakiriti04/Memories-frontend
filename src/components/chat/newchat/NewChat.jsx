import React,{useState, useEffect} from 'react'
import useStyles from "./styles";
import { FormControl, InputLabel, Input, Button, Paper, CssBaseline, Typography, Select, MenuItem } from '@material-ui/core';
import firebase from "firebase";


const NewChat = ({goToChat,createChat, loggedUser}) => {
    const classes = useStyles();

    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");
    const [username,setUsername] = useState("");
    const [users,setUsers] = useState([]);

    const newchatSubmit = async (e) => {
        e.preventDefault();
        const dockey = getDockey();
        const chatexists = await chatExists(dockey);
        chatexists ? goToChat(dockey,message) : createChat(dockey,message,email,username);
    }

    const getUsers = async () => {
        const usersList = await firebase
            .firestore()    
            .collection("users")
            .get();
        const allusers = usersList.docs
            .map(_doc=>_doc.data().user)
            //.find(user=> user.email === email)
            setUsers(allusers);
    }

    const getDockey = () =>{
        return [firebase.auth().currentUser.email, email].sort().join(":");
    }

    const chatExists = async (dockey) => {
        const chat = await firebase.firestore().collection("chats").doc(dockey).get();
        return chat.exists;
    }

    useEffect(()=>{
        getUsers();
        if(email!==""){
            const uname = users.filter(user=>user.email === email )[0].username;
            setUsername(uname);
        }
    },[users,email])

    return (
        <main className={classes.main}>
            <CssBaseline></CssBaseline>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">Send a Message!</Typography>
                <form className={classes.form} onSubmit={(e)=>newchatSubmit(e)}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="newchat-username">Enter friend's email</InputLabel>
                        <Select
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                        className={classes.input}
                        >
                            <MenuItem value="" disabled>select user</MenuItem>
                        {
                            users.map(user=> user.email!==loggedUser ? <MenuItem key={user.email} value={user.email}>{user.email}</MenuItem>: null)
                        }
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="newchat-message">Enter your message</InputLabel>
                        <Input
                        onChange={(e)=>setMessage(e.target.value)}
                        required
                        value={message}
                        className={classes.input}
                        >
                        </Input>
                    </FormControl>
                    <Button type="submit" variant="contained" className={classes.submit}>Submit</Button>
                </form>
            </Paper>
        </main>
    )
}

export default NewChat
