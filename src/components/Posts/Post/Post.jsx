import React,{useState} from "react";
import {Button,IconButton,Card, CardContent, CardMedia, Typography, CardActions, TextField, Collapse} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteFilledIcon from '@material-ui/icons/Favorite';
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import Send from "@material-ui/icons/Send"
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost, updatePost } from "./../../../actions/posts";

import useStyles from "./styles";

function Post({ post, setCurrentId, loggedUser }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [comment,setComment] = useState("");
  const [liked,setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handlePostDelete = (id) => {
    dispatch(deletePost(id));
  };

  const handleLikeCount = (id) => {
    setLiked(true);
    dispatch(likePost(id,"LIKE"));
  };

  const handledislikeCount = (id) => {
    setLiked(false);
    dispatch(likePost(id,"DISLIKE"));
  };

  const handleComment = (id)=>{
    dispatch(updatePost(id,{...post,comments:[...post.comments,{username:loggedUser,message:comment}]}))
    setComment("");
  }

  return (
    <>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.creator}
        />
        <div className={classes.overlay}>
          <Typography variant="h5"> {post.creator}</Typography>
          <Typography variant="body2" component="p">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {loggedUser===post.creator ? <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div> : null}
        <CardActions className={classes.cardActions}>
          <div>
        {
          liked ? <Button onClick={() => handledislikeCount(post._id)}><FavoriteFilledIcon color="secondary" size="small" />{post.likeCount} </Button> :
          <Button onClick={() => handleLikeCount(post._id)}><FavoriteIcon color="secondary" size="small" /> {post.likeCount}</Button>
        }
        <IconButton
          // className={}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ChatBubbleOutlineRoundedIcon />
        </IconButton>
        </div>
        {
          loggedUser===post.creator ? <IconButton onClick={() => handlePostDelete(post._id)}>
            <DeleteIcon />
            </IconButton> : null 
        }
        </CardActions>
        <CardContent className={classes.cardcontent}>
          <Typography variant="body2" component="h5">
            <strong>{post.creator}</strong> {post.message}
          </Typography>
          <div className={classes.chatTextBoxContainer}> 
          <TextField placeholder="Add comments" value={comment} fullWidth onChange={(e)=>setComment(e.target.value)}
            className={classes.chatTextBox}
            ></TextField>
          <Send onClick={()=>handleComment(post._id)} className={classes.sendBtn}></Send>
          </div>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div className={classes.comments}>
          {
            post.comments.length > 0 ? post.comments.map(comment=><Typography key={comment.message} variant="body2" component="h5" style={{marginBottom:"5px"}}><strong>{comment.username}</strong> {comment.message}</Typography>) : null
          }
          </div>
        </CardContent>
      </Collapse>
      </Card>
    </>
  );
}

export default Post;
