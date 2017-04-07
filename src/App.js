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

// Firebase main object available for import in other components.
export const firebase = require("firebase/app");
// Firebase add-ons.
require("firebase/auth");
require("firebase/database");

class App extends Component {
  constructor(props) {
    super(props);

    // Initialize Firebase.
    firebase.initializeApp(firebaseConfig);

    // Get the Firebase Auth service.
    this.auth = firebase.auth();
    this.state = {
      authenticated: (this.auth.currentUser || false),
      user: this.auth.currentUser
    };

    // Ensure we can gather user data if anything changes.
    this.authStateChange = this.authStateChange.bind(this);
    this.auth.onAuthStateChanged(this.authStateChange);
  }

  authStateChange(user) {
    if (user) {
      this.setState({ authenticated: true, user: user });
    } else {
      this.setState({ authenticated: false, user: null });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>React App</h1>
        </div>
        <Authentication auth={ this.auth } user={ this.state.user } />
        <PostList user={ this.state.user } />
        <NewPost user={ this.state.user } />
      </div>
    );
  }
}

export default App;
