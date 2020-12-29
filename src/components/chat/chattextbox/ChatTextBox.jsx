import React,{useState} from 'react';
import useStyles from "./styles";
import TextField from "@material-ui/core/TextField";
import Send from "@material-ui/icons/Send"

const ChatTextBox = ({submitMessageFn, userClickedInputFn}) => {
    const classes = useStyles();

    const [chatText, setChatText] = useState("");

    const isValidMessage = (text) => {
        return text && text.replace(/\s/g,"").length;
    }

    const submitMessage = () => {
        if(isValidMessage(chatText)){
            //submit function
            submitMessageFn(chatText);
            setChatText("");
        }
    }

    return (
        <div className={classes.chatTextBoxContainer}>
            <TextField placeholder="Enter your message..."
            onChange = {(e)=> setChatText(e.target.value)}
            onFocus = {userClickedInputFn}
            value={chatText}
            className={classes.chatTextBox}
            ></TextField>
            <Send onClick={submitMessage} className={classes.sendBtn}></Send>
        </div>
    )
}

export default ChatTextBox
