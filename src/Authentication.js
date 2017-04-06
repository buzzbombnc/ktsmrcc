import React, { Component } from 'react';
import './App.css';

import { firebase } from './App';

var firebaseui = require("firebaseui");

export default class Authentication extends Component {
    constructor(props) {
        super(props);

        var uiconfig = {
            callbacks: {
                signInSuccess: () => false,
            },
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            tosUrl: ''
        };
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start("#auth-container", uiconfig);
    }

    render() {
        return (
            <div id="auth-container">Authentication</div>
        );
    }
}
