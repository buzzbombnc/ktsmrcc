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
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

    componentWillMount() {
        this.likesRef.on("value", (ds) => {
            var like_data = ds.val();
            // like_data will either be null or an object where keys = user IDs.
            if (like_data) {
                // Update our state with an array of usernames.
                this.setState({likes: Object.keys(like_data)});
            } else {
                // No likes!
                this.setState({likes: []});
            }
        });
    }

    componentWillUnmount() {
        // Kill the Firebase event handler.
        this.likesRef.off();
    }

    render() {
        var userid = firebase.auth().currentUser.uid;
        var userlikes = this.state.likes.includes(userid);
        return (
            <div className="Postlikes">
                <p>{ String(userlikes) } { this.state.likes.length }</p>
            </div>
        );
    }
}
