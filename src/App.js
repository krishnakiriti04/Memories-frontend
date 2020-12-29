import React,{useEffect, useState} from "react"
import './App.css';
import Posts from "./components/Posts/Posts";
import PostForm from "./components/PostForm/PostForm";
import {Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import trophy from "./images/trophy.png";
import useStyles from "./styles";
import {useDispatch} from "react-redux";
import {getPosts} from "./actions/posts";
import Navbar from "./components/navbar/Navbar";

function App() {
  const classes =  useStyles();
  const dispatch = useDispatch();

  const [currentId, setCurrentId] = useState(null);

  useEffect(()=>{
    dispatch(getPosts());
  },[dispatch])

  return (
    <>
    <Navbar />
    <Container maxwidth = "lg" >
      <AppBar position="static" className={classes.appBar} color="inherit">
        <Typography variant="h2" align="center" className={classes.heading} >Memories</Typography>
          <img src={trophy} className={classes.image} alt="" width="60" height="60"/>
      </AppBar>
      <Grow in>
          <Container>
            <Grid container justify="space-between" align-items="strech" spacing={3}>
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
