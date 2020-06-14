import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';

export default class Navigation extends Component {
    render() {
        return (
            <Navbar>
                <Navbar href="/">
                    CheckList
                </Navbar>
            </Navbar>
        )
    }
}