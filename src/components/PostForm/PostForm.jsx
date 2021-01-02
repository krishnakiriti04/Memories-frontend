import React,{useState, useEffect} from 'react';
import {TextField, Button, Typography, Paper, CircularProgress} from "@material-ui/core";
import useStyles from "./styles";
import FileBase from "react-file-base64"
import {useDispatch, useSelector } from "react-redux";
import {createPost, updatePost } from "../../actions/posts";

function PostForm({currentId, setCurrentId,loggedUser}) {
    const classes =  useStyles();
    const dispatch = useDispatch()
    const currPostData = useSelector((state)=> state.posts.posts ? state.posts.posts.find((post)=>post._id === currentId) : null)
    const [message,setMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState("");
    const [loading,setLoading] = useState(false);
    const creator = loggedUser;
    // const [postData,setPostData] = useState({
    //     message:"",selectedFile:"",creator:""
    // })
    
    useEffect(()=>{
        if(currPostData){
            setMessage(currPostData.message);
            setSelectedFile(currPostData.selectedFile)
            //setCreator(currPostData.creator)
        }
    },[currPostData])

    const handleSubmit = (e) =>{
        e.preventDefault();
        setLoading(true);
       //setCreator(loggedUser);
       const postData = {creator,selectedFile,message};
        //if currentId is present updating of form should happen
        if(currentId){
            dispatch(updatePost(currentId,postData))
            setCurrentId(null);
        }else{
            dispatch(createPost(postData));
        }
        handleClear();
        setLoading(false);
    }

    const handleClear = () =>{
        setMessage("");
        setSelectedFile(null);
    }

    return (
     <Paper className={classes.paper}>
            <form className={classes.form} autoComplete="off" noValidate onSubmit={handleSubmit}> 
                <Typography variant="h6">Create a Memory</Typography>
                <TextField name="message" label="Caption"fullWidth value={message} onChange={(e)=>setMessage(e.target.value)} />
                <div className={classes.fileInput} >
                    <FileBase 
                        type="file" 
                        multiple={false}
                        onDone={({base64})=>setSelectedFile(base64)}  
                    />
                </div>
                <Button type="submit" className={classes.buttonSubmit} size="large" fullWidth color="primary" variant="contained" >Submit {loading && <CircularProgress />} </Button>
            </form>
     </Paper>
    )
}

export default PostForm
