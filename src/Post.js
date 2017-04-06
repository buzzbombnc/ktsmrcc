import React, { Component } from 'react';
import './App.css';

export default class Post extends Component {
    render() {
        var post = this.props.post;
        return (
            <div className="Post">
                <h1>{ post.user }</h1>
                <p>{ post.message }</p>
                <p>{ String(post.likes) }</p>
            </div>
        );
    }
}
