import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';

export default class Navigation extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Brand href="/">
                    CheckList
                </Navbar.Brand>
            </Navbar>
        )
    }
}