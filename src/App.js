import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Authentication from './Authentication';

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
        { this.state.authenticated || <Authentication firebase={ this.firebase }/> }
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
