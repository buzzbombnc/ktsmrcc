import React, { Component } from 'react';
import './App.css';

import { firebase } from './App';
import PostLike from './PostLike';

export default class Post extends Component {
    render() {
        var post = this.props.post;

        return (
            <div className="Post">
                <h1>{ post.user }</h1>
                <p>{ post.message }</p>
                <PostLike postkey={ this.props.postkey } />
            </div>
        );
    }
}
