import React, { Component } from 'react';
import './App.css';

import { firebase } from './App';

export default class PostLike extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            likes: []
        };
        
        // The Firebase reference to the likes for this post.
        this.likesRef = firebase.database().ref('posts').child(this.props.postkey).child('likes');
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount() {
        var like_data;
        this.likesRef.on("value", (ds) => like_data = ds.val());
        // like_data will either be null or an object.
        if (like_data) {
            // Update our state with an array of usernames.
            this.setState({likes: Object.values(like_data).map((i) => i.username)});
        }
    }

    componentWillUnmount() {
        // Kill the Firebase event handler.
        this.likesRef.off();
    }

    render() {
        var username = firebase.auth().currentUser.email;
        var userlikes = this.state.likes.includes(username);
        return (
            <div className="Postlikes">
                <p>{ String(userlikes) } { this.state.likes.length }</p>
            </div>
        );
    }
}
