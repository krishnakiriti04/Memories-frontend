import React,{useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import './App.css';
import Posts from "./components/Posts/Posts";
import PostForm from "./components/PostForm/PostForm";
import {Container, AppBar, Grow, Grid } from "@material-ui/core";
import useStyles from "./styles";
import {useDispatch} from "react-redux";
import {getPosts} from "./actions/posts";
import Navbar from "./components/navbar/Navbar";
import firebase from "firebase";

function App() {
  const classes =  useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [currentId, setCurrentId] = useState(null);

  useEffect(()=>{
    firebase.auth().onAuthStateChanged(_usr => {
      if(_usr){
        dispatch(getPosts());
      }else{
        history.push("/login");
      }
    })
    
  },[dispatch,history])

  return (
    <>
    <Navbar />
    <Container maxwidth = "lg" >
      <AppBar position="static" className={classes.appBar} color="inherit">
        {/* <Typography variant="h2" align="center" className={classes.heading} >Memories</Typography>
          <img src={trophy} className={classes.image} alt="" width="60" height="60"/> */}
      </AppBar>
      <Grow in>
          <Container>
            <Grid container justify="space-between" alignItems="strech" spacing={3}>
                <Grid item xs={12} sm={7}>
                  <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <PostForm currentId={currentId} setCurrentId={setCurrentId} />
                </Grid>
            </Grid>
          </Container>
      </Grow>
    </Container>
    </>
  );
}

export default App;
