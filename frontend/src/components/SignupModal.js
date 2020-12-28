import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import config from "../config";
import { withRouter } from 'react-router';

class SignupModal extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            username: '',
            email: '',
            password: '',
            show: false
        };
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = e => {
        e.preventDefault();
        this.setState({ show: true });
    }

    updateUsername = e => {
        this.setState({ username: e.target.value });
    }

    updateEmail = e => {
        this.setState({ email: e.target.value });
    }

    updatePassword = e => {
        this.setState({ password: e.target.value });
    }

    submitForm = e => {
        e.preventDefault();
        this.setState({ showError: false });

        axios.post(`${config.API_URL}/account/`, {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        })
        .then(res => {
             this.props.history.push('/list');
        })
        .catch(err => {
            if (err.response) {
                this.setState(() => ({ showError: true }));
            }
        });
    }

    render() {
        return (
            <div>
                <p><a href="/signup" className="sign-up" onClick={this.handleShow}>Sign up</a></p>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="email" onChange={this.updateUsername} />
                                <Form.Text className="d-none text-danger">Username has already been taken.</Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" onChange={this.updateEmail} />
                                <Form.Text className="d-none text-danger">Please enter valid email address.</Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={this.updatePassword} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.submitForm}>Creact Account</Button>
                        <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default withRouter(SignupModal);
