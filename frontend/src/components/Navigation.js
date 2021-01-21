import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'shards-react';

export default class Navigation extends Component {

    logUserOut() {
        localStorage.removeItem('auth_token');
        window.location = '/';
    }

    render() {
        const isAuthenticated = localStorage.getItem('auth_token');
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
                        <NavItem>
                            <NavLink href="/" onClick={ this.logUserOut }>
                                Log out
                            </NavLink>
                        </NavItem>
                    </Nav>
                    : ''
                }

            </Navbar>
        );
    }
}