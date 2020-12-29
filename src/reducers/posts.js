const PostReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCH_ALL":
            return {...state, posts: action.payload };
        case "CREATE_POST":
            return {...state, posts: [...state.posts, action.payload] };
        case "UPDATE_POST":
        case "LIKE_POST":
            return {...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post) }
        case "DELETE_POST":
            return {...state, posts: state.posts.filter((post) => post._id !== action.payload._id) }
        default:
            return state;
    }
}

export default PostReducer;