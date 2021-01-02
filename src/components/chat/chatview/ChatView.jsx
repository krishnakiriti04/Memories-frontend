import React,{useEffect} from 'react';
import useStyles from "./styles";
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"


const ChatView = ({chats,userEmail,loggedUser}) => {
    const classes = useStyles();

    useEffect(()=>{
        const container = document.getElementById("chatview-container");
        if(container){
            container.scrollTo(0, container.scrollHeight);
        }
    })

    return (chats !== undefined) ? (
        <div>
            <div className={classes.chatHeader}>
                <Avatar>
                    {
                        chats.users.filter((_user)=>_user.email !== userEmail)[0].email.split("")[0]
                    }
                </Avatar>
                <Typography component="span" variant="h6" className={classes.sender}>
                    {
                        chats.users.filter((_user)=> _user.username !== loggedUser)[0].username
                    }
                </Typography>
            </div>
            <main className={classes.content} id="chatview-container">
                {
                    chats.messages.map((_msg, _index)=>{
                        return (
                            <div key={_index} className={_msg.sender===userEmail ? classes.friendSent : classes.userSent}>
                                {_msg.message}
                            </div>
                        )
                    })
                }
            </main>
        </div>
    ) : null
    // (
    //     <main className={classes.content} id="chatview-container">
    //     </main>
    // )
}

export default ChatView
