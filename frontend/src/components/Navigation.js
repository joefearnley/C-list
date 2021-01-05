import React, { Component } from 'react';
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Collapse
} from 'shards-react';

export default class Navigation extends Component {
    constructor(props) {
        super(props);
    }

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