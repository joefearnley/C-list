import React, { Component } from 'react';
import LoginModal from './LoginModal.js';
import SignupModal from './SignupModal.js';
import { Check2Square } from 'react-bootstrap-icons';

export default class Home extends Component {

    render() {
        return (
            <div>
                <header className="home">
                    <h1>CheckList <Check2Square /></h1>
                    <p>Check those things off the list.</p>
                    <SignupModal />
                    <LoginModal />
                </header>
            </div>
        );
    }
}