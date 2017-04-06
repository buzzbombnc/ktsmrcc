import React, { Component } from 'react';
import './App.css';

import { firebase } from './App';

export default class NewPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        };

        this.postsref = firebase.database().ref('posts');
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ message: event.target.value});
    }

    handleSubmit(event) {
        // Build the post.
        var postdata = {
            user: firebase.auth().currentUser.email,
            message: this.state.message,
            likes: {}
        };
        // Get a new key for this post.
        var newPostRef = this.postsref.push();
        newPostRef.set(postdata);
        // Clean up for a new new post!
        this.setState({message: ''});
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={ this.handleSubmit }>
                <label>
                    Message:
                    <textarea value={ this.state.message} onChange={ this.handleChange } />
                </label>
                <input type="submit" value="Post" />
            </form>
        );
    }
}
