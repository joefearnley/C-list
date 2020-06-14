import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default class LoginModal extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            email: '',
            password: ''
        };
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = e => {
        e.preventDefault();
        this.setState({ show: true });
    }

    updateEmail = e => {
        this.setState({ email: e.target.value });
    }

    updatePassword = e => {
        this.setState({ password: e.target.value });
    }

    submitForm = e => {
        e.preventDefault();

        const credentials = {
            email: this.state.email,
            password: this.state.password
        };

        axios.post(`/user/login`, { credentials })
        .then(res => {
            console.log(res);
            console.log(res.data);
        });
    }

    render() {
        return (
            <div>
                <p className="aleady-a-user">
                    Already a user? <a href="/signin" className="sign-in" onClick={this.handleShow}> Sign in</a>
                </p>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={this.updateEmail} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={this.updatePassword} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.submitForm}>Sign in</Button>
                        <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
