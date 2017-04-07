import React, { Component } from 'react';
import './App.css';

export default class Authentication extends Component {
    constructor(props) {
        super(props);

        // Form state.
        this.state = {
            email: '',
            password: ''
        };

        // Bind event handlers.
        this.handleChange = this.handleChange.bind(this);
        this.doLogin = this.doLogin.bind(this);
        this.doRegister = this.doRegister.bind(this);
        this.doLogout = this.doLogout.bind(this);
    }

    canClick() {
        return !(
            this.state.email &&
            this.state.email.length > 3 &&
            this.state.password &&
            this.state.password.length > 6
        );
    }
    
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value});
    }

    doLogin() {
        this.props.auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch((e) => alert(e.message));
    }

    doRegister() {
        this.props.auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .catch((e) => alert(e.message));
    }

    doLogout() {
        this.props.auth.signOut();
    }

    render() {
        if (this.props.user) {
            var dn = this.props.user.displayName || this.props.user.email;
            return (
                <div>
                    Logged in as {dn}. <button onClick={ this.doLogout }>Logout</button>
                </div>);
        } else {
            return (
                <div>
                    <div>
                        <label>Email Address: <input type="text" name="email" value={ this.state.email } onChange={ this.handleChange } /></label>
                        <label>Password: <input type="password" name="password" value={ this.state.password } onChange={ this.handleChange } /></label>
                    </div>
                    <div>
                        <button disabled={this.canClick()} onClick={this.doRegister}>Register</button> 
                        <button disabled={this.canClick()} onClick={this.doLogin }>Login</button>
                    </div>
                </div>
            );
        }
    }
}
