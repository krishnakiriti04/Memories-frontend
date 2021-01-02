import axios from "axios";

const url = "https://zen-memories.herokuapp.com/posts";

export const fetchPosts = () => axios.get(url);

export const createPost = (postData) => axios.post(url, postData);

export const updatePost = (id, updateData) => axios.patch(`${url}/${id}`, updateData);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`)