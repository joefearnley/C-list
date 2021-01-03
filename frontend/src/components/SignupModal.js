import React, { Component } from 'react'
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
import axios from 'axios';
import config from "../config";
import { withRouter } from 'react-router';

class SignupModal extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            username: '',
            email: '',
            password: '',
            open: false
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
                <p><a href="/signup" className="sign-up" onClick={this.handleOpen}>Sign up</a></p>
                <Modal open={this.state.open} onHide={this.handleClose}>
                    <ModalHeader>Create Account</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <label htmlFor="username">Username</label>
                                <FormInput id="username" type="text" onChange={this.updateUsername} />
                                <FormFeedback className="d-none text-danger">Username has already been taken.</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="email">Email address</label>
                                <FormInput id="email" type="email" onChange={this.updateEmail} />
                                <FormFeedback className="d-none text-danger">Please enter valid email address.</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="email">Password</label>
                                <FormInput id="password" type="password" onChange={this.updatePassword} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="primary" onClick={this.submitForm}>Sign up</Button>
                        <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default withRouter(SignupModal);
