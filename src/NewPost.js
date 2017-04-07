import React, { Component } from 'react';
import './App.css';

import { firebase } from './App';

export default class NewPost extends Component {
    constructor(props) {
        super(props);

        // By default, an empty message.
        this.state = {
            message: ''
        };

        // Get the overall posts reference.
        this.postsref = firebase.database().ref('posts');
        this.handleChange = this.handleChange.bind(this);
        this.postMessage = this.postMessage.bind(this);
    }

    canType() {
        return !(
            this.props.user
        );
    }

    canPost() {
        return !(
            this.props.user &&
            this.state.message &&
            this.state.message.length > 5
        );
    }

    handleChange(event) {
        this.setState({ message: event.target.value});
    }

    postMessage() {
        // Build the post.
        var postdata = {
            user: this.props.user.email,
            message: this.state.message
        };
        // Get a new key for this post.
        var newPostRef = this.postsref.push();
        newPostRef.set(postdata);
        // Clean up for a new new post!
        this.setState({message: ''});
    }

    render() {
        return (
            <div>
                <label>
                    Message:
                    <textarea disabled={this.canType()} value={ this.state.message} onChange={ this.handleChange } />
                </label>
                <input disabled={this.canPost()} type="submit" value="Post" onClick={this.postMessage}/>
            </div>
        );
    }
}
