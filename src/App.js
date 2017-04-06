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

require("firebase/auth");
require("firebase/database");

class App extends Component {
  constructor(props) {
    super(props);

    this.firebase = require("firebase/app");
    this.firebase.initializeApp(firebaseConfig);

    this.authStateChange = this.authStateChange.bind(this);
    this.firebase.auth().onAuthStateChanged(this.authStateChange);

    this.state = {
      authenticated: false
    };
  }

  authStateChange(user) {
    if (user) {
      this.setState({ authenticated: true });
    }
  }

  render() {
    return (
      <div className="App">
        <Authentication firebase={ this.firebase }/>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <PostList firebase={ this.firebase } />
        { this.state.authenticated && <NewPost firebase={ this.firebase } /> }
      </div>
    );
  }
}

export default App;
