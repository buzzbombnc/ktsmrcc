import React, { Component } from 'react';
import './App.css';

export default class Post extends Component {
    render() {
        var post = this.props.post;

        // Sane default.
        var likes = {count: 0, user: false};
        // But if the database has populated, get the data right.
        if (post.likes) {
            var username = this.props.firebase.auth().currentUser.email;
            var users = Object.values(post.likes).map((i) => i.username);
            likes.count = users.length;
            likes.user = users.includes(username);
        }
        return (
            <div className="Post">
                <h1>{ post.user }</h1>
                <p>{ post.message }</p>
                <p>{ String(likes.user) } { likes.count }</p>
            </div>
        );
    }
}
