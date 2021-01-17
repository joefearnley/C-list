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
        const pathName = window.location.pathname;

        return (
            <Navbar type="dark" theme="primary" expand="md">
                <NavbarBrand href="/">C-lister</NavbarBrand>

                { isAuthenticated ? 
                    <Nav navbar className="ml-auto">
                        <NavItem>
                            <NavLink active={ pathName === '/list' } disabled={ pathName === '/list' } href="/list">
                                Checklist
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink active={ pathName === '/account' } disabled={ pathName === '/account' } href="/account">
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