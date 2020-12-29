import * as api from "../api/index";


//action creator
export const getPosts = () => async(dispatch) => {
    try {
        const { data } = await api.fetchPosts()

        dispatch({
            type: "FETCH_ALL",
            payload: data
        })

    } catch (error) {
        console.log(error.message)
    }

}

export const createPost = (postData) => async(dispatch) => {
    try {
        const { data } = await api.createPost(postData);

        dispatch({
            type: "CREATE_POST",
            payload: data
        })

    } catch (error) {
        console.log(error.message)
    }
}

export const updatePost = (id, updateData) => async(dispatch) => {
    try {
        const { data } = await api.updatePost(id, updateData);

        dispatch({
            type: "UPDATE_POST",
            payload: data
        })

    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        const { data } = await api.deletePost(id);
        dispatch({
            type: "DELETE_POST",
            payload: data
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const likePost = (id) => async(dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({
            type: "LIKE_POST",
            payload: data
        })
    } catch (error) {
        console.log(error.message)
    }
}