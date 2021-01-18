import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default class Home extends Component {

    render() {
        return (
            <div>
                <header className="home">
                    <h1>C-lister <FontAwesomeIcon icon={faCheck} /></h1>
                    <p>Check those things off the list.</p>
                    <p>
                        <a href="/signup" className="sign-up" onClick={this.handleOpen}>Sign up</a>
                    </p>
                    <p className="aleady-a-user">
                        Already a user? <a href="/login" className="sign-in" onClick={this.handleOpen}> Log in</a>
                    </p>
                </header>
            </div>
        );
    }
}