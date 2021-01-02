import React from "react";
import {
  Button,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/FavoriteBorderOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "./../../../actions/posts";

import useStyles from "./styles";

function Post({ post, setCurrentId, loggedUser }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handlePostDelete = (id) => {
    dispatch(deletePost(id));
  };

  const handleLikeCount = (id) => {
    dispatch(likePost(id));
  };

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
          <Button onClick={() => handleLikeCount(post._id)}>
            <FavoriteIcon color="secondary" size="small" /> {post.likeCount}
          </Button>
          <IconButton onClick={() => handlePostDelete(post._id)}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
        <CardContent>
          <Typography variant="body2" component="h5">
            <strong>{post.creator}</strong> {post.message}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default Post;
