import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import apiClient from '../api';
import config from "../config";
import { withRouter } from 'react-router';

class LoginModal extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            username: '',
            email: '',
            password: '',
            showError: ''
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

        apiClient.post(`${config.API_URL}/token-auth/`, {
            username: this.state.username,
            password: this.state.password
        })
        .then(res => {
            console.log(res.data);
            
            localStorage.setItem('token', res.data.token);
            this.props.history.push('/list');
        })
        .catch(err => {
            console.log(err.response);
            if (err.response) {
                this.setState(() => ({ showError: true }));
            }
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
                        <Modal.Title>Log In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" onChange={this.updateUsername} />
                                <Form.Control.Feedback type="invalid">Please enter Username</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={this.updatePassword} />
                                <Form.Control.Feedback type="invalid">Please enter password</Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                        <p className={this.state.showError ? 'show-error' : 'hide-error'}>Your Username and Password do not match. Please try again.</p>
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

export default withRouter(LoginModal);
