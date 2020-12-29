import React,{useState, useEffect} from 'react';
import {TextField, Button, Typography, Paper} from "@material-ui/core";
import useStyles from "./styles";
import FileBase from "react-file-base64"
import {useDispatch, useSelector } from "react-redux";
import {createPost, updatePost } from "../../actions/posts";

function PostForm({currentId, setCurrentId}) {
    const classes =  useStyles();
    const dispatch = useDispatch()
    const currPostData = useSelector((state)=> state.posts.posts ? state.posts.posts.find((post)=>post._id === currentId) : null)
    const [postData,setPostData] = useState({
        creator:"",title:"",message:"",selectedFile:"",tags:""
    })
    
    useEffect(()=>{
        if(currPostData){
            setPostData(currPostData);
        }
    },[currPostData])

    const handleSubmit = (e) =>{
        e.preventDefault();

        //if currentId is present updating of form should happen
        if(currentId){
            dispatch(updatePost(currentId,postData))
            setCurrentId(null);
        }else{
            dispatch(createPost(postData));
        }
        handleClear();
    }

    const handleClear = () =>{
        setPostData({
            creator:"",title:"",message:"",selectedFile:"",tags:""
        })
    }

    return (
     <Paper className={classes.paper}>
            <form className={classes.form} autoComplete="off" noValidate onSubmit={handleSubmit}> 
                <Typography variant="h6">Create a Memory</Typography>
                <TextField name="creator" label="Creator"fullWidth value={postData.creator} onChange={(e)=>setPostData({...postData, creator : e.target.value})} />
                <TextField name="title" label="Title" fullWidth value={postData.title} onChange={(e)=>setPostData({...postData, title : e.target.value})}/>
                <TextField name="message" label="Message"fullWidth value={postData.message} onChange={(e)=>setPostData({...postData, message : e.target.value})} />
                <TextField name="tags" label="Tags" fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData, tags : e.target.value})}/>
                <div className={classes.fileInput} >
                    <FileBase 
                        type="file" 
                        multiple={false}
                        onDone={({base64})=>setPostData({...postData, selectedFile:base64})}
                      
                    />
                </div>
                <Button type="submit" className={classes.buttonSubmit} size="large" fullWidth color="primary" variant="contained" >Submit</Button>
                <Button onClick={handleClear} className={classes.buttonSubmit} size="large" fullWidth variant="contained" >Clear</Button>
            </form>
     </Paper>
    )
}

export default PostForm
