import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

export default class Home extends Component {

    render() {
        return (    
            <div>
                <header className="home">
                    <h1>CheckList <FontAwesomeIcon icon={faCheck} /></h1>
                    <p>Check those things off the list.</p>
                    <SignupModal />
                    <LoginModal />
                </header>
            </div>
        );
    }
}