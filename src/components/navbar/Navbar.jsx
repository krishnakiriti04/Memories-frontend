import React,{useState} from 'react';
import {useHistory} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from "@material-ui/core/Button";
import useStyles from "./styles";
import firebase from "firebase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


export default function Navbar({loggedUser}) {
  const classes = useStyles();
  const [auth, setAuth] = useState(true);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleSignout = () => {
    setAuth(false)
    firebase.auth().signOut();
    history.push("/login");
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <List component="nav" className={classes.navLeft}>
              <ListItem button onClick={()=>history.push("/")} className={classes.listitem}>Memories</ListItem>
              <ListItem button onClick={()=>history.push("/chat")} className={classes.listitem}>Chat</ListItem>
          </List>
          {auth && (
            <div className={classes.navRight}>
              <div className={classes.rightItems}>
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
                <MenuItem onClick={handleClose}>{loggedUser}</MenuItem>
              </Menu>
              </div>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={handleSignout}
                  size="small"
                >
                  Sign Out
                </Button>
              </div>
           )} 
          
             {/* <Typography
          //     variant="h6"
          //     className={classes.signoutbtn}
          //     onClick={() => history.push("/login")}
          //   >
          //     Login
          //   </Typography>
          // )} */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
