import React, { Component } from 'react';
import apiClient from '../api';
import config from "../config";
import { withRouter } from 'react-router';
import { 
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Form,
    FormGroup,
    FormInput,
    FormFeedback 
} from "shards-react";

class LoginModal extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            open: false,
            username: '',
            email: '',
            password: '',
            showError: ''
        };
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleOpen = e => {
        e.preventDefault();
        this.setState({ open: true });
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
            localStorage.setItem('token', res.data.token);
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
                <p className="aleady-a-user">
                    Already a user? <a href="/signin" className="sign-in" onClick={this.handleOpen}> Sign in</a>
                </p>
                <Modal open={this.state.open} onHide={this.handleClose}>
                    <ModalHeader>Log In</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <label htmlFor="username">Username</label>
                                <FormInput id="username" type="text" onChange={this.updateUsername} />
                                <FormFeedback type="invalid">Please enter Username</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="password">Password</label>
                                <FormInput id="password" type="password" onChange={this.updatePassword} />
                                <FormFeedback type="invalid">Please enter password</FormFeedback>
                            </FormGroup>
                        </Form>
                        <p className={this.state.showError ? 'show-error' : 'hide-error'}>Your Username and Password do not match. Please try again.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="primary" onClick={this.submitForm}>Sign in</Button>
                        <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default withRouter(LoginModal);
