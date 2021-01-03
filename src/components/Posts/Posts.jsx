import React from 'react'
import Post from "./Post/Post";
import useStyles from "./styles";
import  {useSelector} from "react-redux";
import {Grid, CircularProgress} from "@material-ui/core";

function Posts({setCurrentId, loggedUser}) {
    const classes =  useStyles();
    const posts = useSelector((state)=>state.posts.posts)
    //state.posts is the reducer we've combined in reducers folder
    return (!posts ? <CircularProgress /> : 
                    <Grid container className={classes.container} alignItems="stretch" spacing={3}>
                        {
                            posts
                            .sort((a,b)=> new Date(b.createdAt) -  new Date(a.createdAt))
                            .map((post)=>(
                                <Grid item xs={12} sm={12} key={post._id}>
                                    <Post post={post} setCurrentId={setCurrentId} loggedUser = {loggedUser}/>
                                </Grid>
                            ))
                        }
                    </Grid>   
    )
}

export default Posts
