import React,{useState} from 'react'
import useStyles from "./styles";
import { FormControl, InputLabel, Input, Button, Paper, CssBaseline, Typography } from '@material-ui/core';
import firebase from "firebase";


const NewChat = ({goToChat,createChat}) => {
    const classes = useStyles();

    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");

    const newchatSubmit = async (e) => {
        e.preventDefault();
        const userexists = await userExists();
        if(userexists){
            const chatexists = await chatExists();
            const dockey = getDockey();
            chatexists ? goToChat(dockey,message) : createChat(dockey,message,email);
        }
    }

    const userExists = async () => {
        const usersList = await firebase
            .firestore()
            .collection("users")
            .get();
        const exists = usersList.docs
            .map(_doc=>_doc.data().email)
            .includes(email)
        return exists;
    }

    const getDockey = () =>{
        return [firebase.auth().currentUser.email, email].sort().join(":");
    }

    const chatExists = async () => {
        const dockey = getDockey();
        const chat = await firebase.firestore().collection("chats").doc(dockey).get();
        return chat.exists;
    }

    return (
        <main className={classes.main}>
            <CssBaseline></CssBaseline>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">Send a Message!</Typography>
                <form className={classes.form} onSubmit={(e)=>newchatSubmit(e)}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="newchat-username">Enter friend's email</InputLabel>
                        <Input
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                        className={classes.input}
                        autoFocus
                        >
                        </Input>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="newchat-username">Enter your message</InputLabel>
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
