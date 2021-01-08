import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'shards-react';

export default class Navigation extends Component {
    render() {
        const isAuthenticated = localStorage.getItem('token');

        return (
            <Navbar type="dark" theme="primary" expand="md">
                <NavbarBrand href="/">C-lister</NavbarBrand>

                { isAuthenticated ? 
                    <Nav navbar className="ml-auto">
                        <NavItem>
                            <NavLink active href="/account">
                                List
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink active href="/account">
                                Account
                            </NavLink>
                        </NavItem>
                    </Nav>
                    : ''
                }

            </Navbar>
        );
    }
}