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
        return (
            <Navbar type="dark" theme="primary" expand="md">
                <NavbarBrand href="/">C-lister</NavbarBrand>

                <Nav navbar className="ml-auto">
                    <NavItem>
                        <NavLink active href="/account">
                            Account
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}