import React, { Component } from 'react';
import apiClient from '../api';
import config from "../config";
import { withRouter } from 'react-router';
import Navigation from './Navigation';
import { 
    Container,
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    FormInput,
    FormFeedback,
    Alert
} from 'shards-react';

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            account: {
                id: null,
                email: '',
            },
            fields: {
                email: '',
            },
            password: '',
            confirm_password: '',
            showNonFieldError: '',
            nonFieldErrorMessage: '',
            showEmailError: false,
            showEmailUpdatedSuccessMessage: false,
            showPasswordError: false,
            showPasswordUpdatedSuccessMessage: false,
            passwordError: '',
        };

        this.dismissEmailUpdateSuccessMessage = this.dismissEmailUpdateSuccessMessage.bind(this);
        this.dismissPasswordUpdateSuccessMessage = this.dismissPasswordUpdateSuccessMessage.bind(this);
    }

    componentDidMount() {
        this.populateForm();
    }

    dismissEmailUpdateSuccessMessage() {
        this.setState({ showEmailUpdatedSuccessMessage: false });
    }

    dismissPasswordUpdateSuccessMessage() {
        this.setState({ showPasswordUpdatedSuccessMessage: false })
    }

    populateForm = e => {
        apiClient.get(`${config.API_URL}/account/`)
            .then(res => {
                let accountInfo = res.data[0];
                this.setState({
                    account: accountInfo,
                    fields: { 
                        email: accountInfo.email
                    }
                });
            })
            .catch(err => {
                if (err.response) {
                    // redirect to login page....
                }
            });
    }

    updateEmail = e => {
        this.setState({
            fields: {
                email: e.target.value
            },
            showEmailError: false
        });
    }

    submitUpdateAccountForm = e => {
        e.preventDefault();
        this.setState({ showEmailError: false });

        apiClient.patch(`${config.API_URL}/account/${this.state.account.id}/`, {
            username: this.state.fields.username,
            email: this.state.fields.email
        })
        .then(res => {
            this.setState({ showEmailUpdatedSuccessMessage: true });
        })
        .catch(err => {
            if (err.response) {
                if (err.response.data.email) {
                    this.setState({ showEmailError: true })
                }

                if (err.response.data.non_field_errors) {
                    this.setState(() => ({ 
                        showNonFieldError: true,
                        nonFieldErrorMessage: err.response.data.non_field_errors
                    }));
                }
            }
        });
    }

    updatePassword = e => {
        this.setState({
            password: e.target.value,
            showPasswordError: false
        });
    }

    updateConfirmPassword = e => {
        this.setState({
            confirm_password: e.target.value,
            showPasswordError: false
        });
    }

    submitUpdatePasswordForm = e => {
        e.preventDefault();
        this.setState({ showPasswordError: false });

        apiClient.post(`${config.API_URL}/account/${this.state.account.id}/change-password/`, {
            password: this.state.password,
            confirm_password: this.state.confirm_password
        })
        .then(res => {
            this.setState({ showPasswordUpdatedSuccessMessage: true });
        })
        .catch(err => {
            if (err.response) {
                if (err.response.data.password) {
                    this.setState({ 
                        passwordError: err.response.data.password,
                        showPasswordError: true 
                    })
                }

                if (err.response.data.non_field_errors) {
                    this.setState(() => ({ 
                        showNonFieldError: true,
                        nonFieldErrorMessage: err.response.data.non_field_errors
                    }));
                }
            }
        });
    }

    render() {
        return (
            <div>
                <Navigation />
                <Container>
                    <Row className="justify-content-md-center">
                        <Col sm="10">
                            <Alert theme="success" dismissible={ this.dismissEmailUpdateSuccessMessage } open={ this.state.showEmailUpdatedSuccessMessage }>
                                Your email address has been updated!
                            </Alert>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col sm="8">
                            <h3 className="mb-4">Account Information</h3>
                            <Form>
                                <FormGroup>
                                    <label htmlFor="email">Email address</label>
                                    <FormInput invalid={ this.state.showEmailError } value={ this.state.fields.email || '' } id="email" type="email" onChange={ this.updateEmail } />
                                    <FormFeedback className="text-danger">Please enter valid email address.</FormFeedback>
                                </FormGroup>
                            </Form>

                            <p className={this.state.showNonFieldError ? 'show-error' : 'hide-error'}>
                                { this.state.nonFieldErrorMessage }
                            </p>

                            <Button className="mr-2" theme="primary" onClick={this.submitUpdateAccountForm}>Update</Button>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center mt-5">
                        <Col sm="10">
                            <Alert theme="success" dismissible={ this.dismissPasswordUpdateSuccessMessage } open={ this.state.showPasswordUpdatedSuccessMessage }>
                                Your password has been updated!
                            </Alert>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col sm="8">
                            <h3 className="mb-4">Change Password</h3>
                            <Form>
                                <FormGroup>
                                    <label htmlFor="password">New Password</label>
                                    <FormInput invalid={ this.state.showPasswordError } id="password" type="password" onChange={ this.updatePassword } />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="password_confirmation">Confirm New Password</label>
                                    <FormInput invalid={ this.state.showPasswordError } id="confirm_password" type="password" onChange={ this.updateConfirmPassword } />
                                </FormGroup>
                            </Form>

                            <p className={this.state.showPasswordError ? 'show-error' : 'hide-error'}>
                                { this.state.passwordError }
                            </p>

                            <Button className="mr-2" theme="primary" onClick={ this.submitUpdatePasswordForm }>Update</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default withRouter(Account);
