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
        window.location = '/C-lister/';
    }

    render() {
        const isAuthenticated = localStorage.getItem('auth_token');
        const pathName = window.location.pathname;

        return (
            <Navbar type="dark" theme="primary" expand="md">
                <NavbarBrand href="/C-lister/">C-lister</NavbarBrand>

                { isAuthenticated ? 
                    <Nav navbar className="ml-auto">
                        <NavItem>
                            <NavLink active={ pathName === '/C-lister/list' } disabled={ pathName === '/C-lister/list' } href={`/C-lister/list`}>
                                Checklist
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink active={ pathName === '/C-lister/account' } disabled={ pathName === '/C-lister/account' } href={`/C-lister/account`}>
                                Account
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/C-lister/" onClick={ this.logUserOut }>
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