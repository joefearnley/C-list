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
    FormFeedback
} from 'shards-react';

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            showPasswordError: false,
            showNonFieldError: '',
            nonFieldErrorMessage: '',
            showAccountUpdatedSuccessMessage: false,
            accountUpdatedSuccessMessage: '',
            showPasswordUpdatedSuccessMessage: false,
            passwordUpdatedSuccessMessage: '',
            showUpdatePasswordError: false,
            updatePasswordError: '',
            showPasswordUpdatedSuccessMessage: false,
            passwordUpdatedSuccessMessage: '',
        };
    }

    componentDidMount() {
        this.populateForm();
    }

    populateForm = e => {
        apiClient.get(`${config.API_URL}/account/`)
            .then(res => {

                console.log(res.data);

                // this.setState({
                //     email: res.data.email,
                // });
            })
            .catch(err => {
                if(err.response) {
                    // redirect to login page....
                }
            });
    }

    updateEmail = e => {
        if (e.target.value !== '') {
            this.setState({ 
                username: e.target.value,
                email: e.target.value,
                showEmailError: false
            });
        }
    }

    updatePassword = e => {
        if (e.target.value !== '') {
            this.setState({
                password: e.target.value,
                showPasswordError: false
            });
        }
    }

    submitUpdateAcountForm = e => {
        e.preventDefault();
        this.setState({ showError: false });

        apiClient.post(`${config.API_URL}/token-auth/`, {
            username: this.state.username,
            email: this.state.email
        })
        .then(res => {
            // Show account updated message
        })
        .catch(err => {
            if (err.response) {
                if (err.response.data.email) {
                    this.setState({ showEmailError: true })
                }

                if (err.response.data.password) {
                    this.setState({ showPasswordError: true })
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
                        <Col sm="8">
                            <h3 className="mb-4">Account Information</h3>
                            <Form>
                                <FormGroup>
                                    <label htmlFor="email">Email address</label>
                                    <FormInput invalid={ this.state.showEmailError } id="email" type="email" placeholder={ this.state.email } onChange={this.updateEmail} />
                                    <FormFeedback className="text-danger">Please enter valid email address.</FormFeedback>
                                </FormGroup>
                            </Form>

                            <p className={this.state.showNonFieldError ? 'show-error' : 'hide-error'}>
                                { this.state.nonFieldErrorMessage }
                            </p>

                            <Button className="mr-2" theme="primary" onClick={this.submitUpdateAcountForm}>Update</Button>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center mt-5">
                        <Col sm="8">
                            <h3 className="mb-4">Change Password</h3>
                            <Form>
                                <FormGroup>
                                    <label htmlFor="email">New Password</label>
                                    <FormInput invalid={ this.state.showError } id="email" type="email" onChange={this.updateEmail} />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="email">Confirm New Password</label>
                                    <FormInput invalid={ this.state.showPasswordError } id="password" type="password" onChange={this.updatePassword} />
                                </FormGroup>
                            </Form>

                            <p className={this.state.showUpdatePasswordError ? 'show-error' : 'hide-error'}>
                                { this.state.updatePasswordError }
                            </p>

                            <Button className="mr-2" theme="primary" onClick={this.submitUdpatePasswordForm}>Update</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default withRouter(Account);
