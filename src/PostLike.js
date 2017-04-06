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
        this.like = this.like.bind(this);
        this.unlike = this.unlike.bind(this);
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

    like() {
        var userid = firebase.auth().currentUser.uid;
        this.likesRef.set({ [userid]: true });
    }

    unlike() {
        var userid = firebase.auth().currentUser.uid;
        this.likesRef.child(userid).remove();
    }

    render() {
        var userid = firebase.auth().currentUser.uid;
        var userlikes = this.state.likes.includes(userid);

        var button;
        if (userlikes) {
            button = (<button onClick={this.unlike}>Unlike</button>);
        } else {
            button = (<button onClick={this.like}>Like</button>);
        }
        return (
            <div className="Postlikes">
                <p>{ button } { this.state.likes.length }</p>
            </div>
        );
    }
}
