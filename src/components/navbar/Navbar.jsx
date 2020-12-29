import React,{useState} from 'react';
import {useHistory} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from "@material-ui/core/Button";
import useStyles from "./styles";
import firebase from "firebase";


export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const history = useHistory();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openChat = () => {
      history.push("/chat")
  }
  
  const handleSignout = () => {
    setAuth(false)
    firebase.auth().signOut();
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.navitems}>
            <Typography variant="h6" className={classes.title} onClick={()=>history.push("/")}>
              Memories
            </Typography>
            <Typography variant="h6" className={classes.chatbtn} onClick={openChat}>
              Chat
            </Typography>
          </div>
          
          {auth ? (
            <>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
            <Button color="secondary" variant="outlined" className={classes.signoutbtn} onClick={handleSignout}>
            Sign Out
          </Button>
            </>
          ) : (<Typography variant="h6" className={classes.signoutbtn} onClick={()=>history.push("/login")}>
          Login
        </Typography>) 
        }
        </Toolbar>
      </AppBar>
    </div>
  );
}
