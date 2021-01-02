import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Badge from '@material-ui/core/Badge';
import AddIcon from "@material-ui/icons/Add"

function ChatList({chats,newChatBtnFn,selectChatFn,userEmail,selectedChatIndex, loggedUser}) {

    const classes = useStyles();

    const userIsSender = (chat) => {
        return chat.messages[chat.messages.length - 1].sender === userEmail
    }

    return (chats.length > 0) ? (
        <div className={classes.root}>
            <main>
                <Button
                    onClick={newChatBtnFn}
                    fullWidth
                    color="primary"
                    variant="contained"
                    className={classes.newChatBtn}
                    startIcon={<AddIcon />}
                >New Message</Button>
                <List>
                    {
                        chats.map((_chat,_index)=>{
                            return (
                                <div key={_index}>
                                    <ListItem onClick={()=>selectChatFn(_index)}
                                     className={classes.listItem}
                                     selected={selectedChatIndex === _index }
                                     align-items = "flex-start">
                                         <ListItemAvatar>
                                             <Avatar>
                                                 {
                                                     _chat.users.filter(_usr =>_usr.email !== userEmail)[0].email.split("")[0]
                                                 }
                                             </Avatar>
                                         </ListItemAvatar>
                                         {/* display username */}
                                         <ListItemText primary={_chat.users.filter(_usr => _usr.username !== loggedUser)[0].username}
                                            secondary={
                                                <>
                                                    <Typography component="span" color="textPrimary">
                                                        {
                                                            _chat.messages[_chat.messages.length - 1].message.substring(0,30)+"..."
                                                        }
                                                    </Typography>
                                                </>
                                            }
                                         >
                                         </ListItemText>
                                         {
                                             _chat.receiverHasRead === false && !userIsSender(_chat) ? (<ListItemIcon>
                                                 <Badge badgeContent={1} className={classes.unreadMessage} color="secondary"></Badge>
                                             </ListItemIcon>) : null
                                         }
                                    </ListItem>
                                    <Divider></Divider>
                                </div>
                            )
                        })
                    }
                </List>
            </main>
        </div>
    ) : (
        <div className={classes.root}>
            <main>
            <Button
                onClick={newChatBtnFn}
                fullWidth
                color="primary"
                variant="contained"
                className={classes.newChatBtn}
                startIcon={<AddIcon />}
            > New Message  </Button>
            </main>
        </div>
    )
}

export default ChatList
