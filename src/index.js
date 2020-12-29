import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Route, BrowserRouter as Router} from "react-router-dom"
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import Chat from "./components/chat/Chat";
import reducers from "./reducers/index";
import firebase from "firebase";

const store = createStore(reducers, compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

firebase.initializeApp({
    apiKey: "AIzaSyBFSEKyLHVykaw5edd4v3GT9BohGYBgGjs",
    authDomain: "memories-chat-bbaf5.firebaseapp.com",
    projectId: "memories-chat-bbaf5",
    storageBucket: "memories-chat-bbaf5.appspot.com",
    messagingSenderId: "30340947922",
    appId: "1:30340947922:web:0f8a768ff3083d7d52b20b"
});

const routing = (
  <Provider store={store}>
  <Router>
    <div>
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/chat" exact component={Chat} />
      <Route path="/" exact component={App} />
    </div>
  </Router>
  </Provider>
);


ReactDOM.render(routing, document.getElementById('root')
);