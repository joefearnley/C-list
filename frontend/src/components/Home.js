import React, { Component } from 'react';
import LoginModal from './LoginModal.js'
import SignupModal from './SignupModal.js'

export default class Home extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <header className="home">
                    <h1>CheckList</h1>
                    <p>Check those things off the list.</p>
                    <SignupModal />
                    <LoginModal />
                </header>
            </div>
        );
    }
}