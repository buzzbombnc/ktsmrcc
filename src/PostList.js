import React, { Component } from 'react';
import './App.css';

import Post from './Post';

export default class PostList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            posts: {}
        };
        
        // The Firebase reference to all the posts.
        this.postRef = this.props.firebase.database().ref('posts');
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount() {
        this.postRef.on("value", (ds) => {
            this.setState({ posts: ds.val()})
        });
    }

    componentWillUnmount() {
        // Kill the Firebase event handler.
        this.postRef.off();
    }

    render() {
        var posts = this.state.posts;
        var keys = Object.keys(posts);
        return (
            <div className="Postlist">
                { keys.map((k) =>
                    <Post key={k} post={posts[k]} />
                )}
            </div>
        );
    }
}
