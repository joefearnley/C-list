import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
                        <Link to={`/signup`} className="sign-up">
                            Sign up
                        </Link>
                    </p>
                    <p className="aleady-a-user">
                        Already a user? 
                        <Link to={`/login`} className="sign-up" onClick={this.handleOpen}>
                            <span className="ml-2">Log in</span>
                        </Link>
                    </p>
                </header>
            </div>
        );
    }
}