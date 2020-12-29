import { combineReducers } from "redux";

import PostReducer from "./posts"

export default combineReducers({
    posts: PostReducer,
})