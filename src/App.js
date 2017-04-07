import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Authentication from './Authentication';
import PostList from './PostList';
import NewPost from './NewPost';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNjGyWHZHgPJ2sQBo8_3J76qPeOc3EWLU",
    authDomain: "ktsmrcc.firebaseapp.com",
    databaseURL: "https://ktsmrcc.firebaseio.com",
    projectId: "ktsmrcc",
    storageBucket: "ktsmrcc.appspot.com",
    messagingSenderId: "89754455415"
};

export const firebase = require("firebase/app");

require("firebase/auth");
require("firebase/database");

class App extends Component {
  constructor(props) {
    super(props);

    // Initialize Firebase.
    this.firebase = firebase;
    firebase.initializeApp(firebaseConfig);

    // Get the Firebase Auth service.
    var auth = firebase.auth();
    this.state = {
      authenticated: (auth.currentUser || false),
      user: auth.currentUser
    };

    // Ensure we can gather user data if anything changes.
    this.authStateChange = this.authStateChange.bind(this);
    auth.onAuthStateChanged(this.authStateChange);
  }

  authStateChange(user) {
    if (user) {
      this.setState({ authenticated: true, user: user });
    }
  }

  render() {
    return (
      <div className="App">
        { this.state.authenticated || <Authentication /> }
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        authenticated = { String(this.state.authenticated) }
        <PostList />
        { this.state.authenticated && <NewPost /> }
      </div>
    );
  }
}

export default App;
