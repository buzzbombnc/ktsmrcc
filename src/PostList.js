import React from 'react';
import './App.css';

var reactfire = require('reactfire');

// Use non-ES6 creation to enable the use of mixins.

var PostList = React.createClass({
    render: function() { return (
                <div>PostList</div>
                );
            },
    mixins: [reactfire],
    componentWillMount: function() {
        var ref = this.props.firebase.database().ref("posts");
        this.bindAsArray(ref, "posts");
    }
});

export default PostList;
