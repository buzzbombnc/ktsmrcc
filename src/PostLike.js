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
        this.canClick = this.canClick.bind(this);
        this.like = this.like.bind(this);
        this.unlike = this.unlike.bind(this);
    }

    componentWillMount() {
        this.likesRef.on("value", (ds) => {
            var like_data = ds.val();
            // like_data will either be null or an object where keys = user IDs.
            this.setState({
                likes: Object.keys(like_data || {})
            });
        });
    }

    componentWillUnmount() {
        // Kill the Firebase event handler.
        this.likesRef.off();
    }

    canClick() {
        return !(
            this.props.user !== null
        );
    }

    like() {
        this.likesRef.set({ [this.props.user.uid]: true });
    }

    unlike() {
        this.likesRef.child(this.props.user.uid).remove();
    }

    render() {
        var userlikes = (this.props.user) ? this.state.likes.includes(this.props.user.uid) : false;

        var button;
        if (userlikes) {
            button = (<button disabled={this.canClick()} onClick={this.unlike}>Unlike</button>);
        } else {
            button = (<button disabled={this.canClick()} onClick={this.like}>Like</button>);
        }
        return (
            <div className="Postlikes">
                <p>{ button } { this.state.likes.length }</p>
            </div>
        );
    }
}
