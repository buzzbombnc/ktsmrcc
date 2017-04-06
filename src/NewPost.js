import React, { Component } from 'react';
import './App.css';

export default class NewPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ message: event.target.value});
    }

    render() {
        return (
            <form>
                <label>
                    Message:
                    <textarea value={ this.state.message} onChange={ this.handleChange } />
                </label>
                <input type="submit" value="Post" />
            </form>
        );
    }
}
