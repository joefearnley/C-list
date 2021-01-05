import React, { Component } from 'react';
import apiClient from '../../api';
import config from "../../config";
import { withRouter } from 'react-router';
import Navigation from '../Navigation';
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

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            showUsernameError: false,
            showPasswordError: false,
            showNonFieldError: '',
            nonFieldErrorMessage: '',
        };
    }

    updateUsername = e => {
        if (e.target.value !== '') {
            this.setState({
                username: e.target.value,
                showUsernameError: false
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
                if (err.response.data.username) {
                    this.setState({ showUsernameError: true })
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
                            <h3 className="mb-4">Log in to your Account</h3>
                            <Form>
                                <FormGroup>
                                    <label htmlFor="username">Username</label>
                                    <FormInput invalid={ this.state.showUsernameError } id="username" type="text" onChange={this.updateUsername} />
                                    <FormFeedback type="invalid">Please enter a username</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="password">Password</label>
                                    <FormInput invalid={ this.state.showPasswordError } id="password" type="password" onChange={this.updatePassword} />
                                    <FormFeedback type="invalid">Please enter a password</FormFeedback>
                                </FormGroup>
                            </Form>

                            <p className={this.state.showNonFieldError ? 'show-error' : 'hide-error'}>
                                { this.state.nonFieldErrorMessage }
                            </p>

                            <Button className="mr-2" theme="primary" onClick={this.submitForm}>Log in</Button>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col sm="8">
                            <p className="aleady-a-user">
                                Don't have an account? <a href="/signup" className="sign-in">Sign up</a>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default withRouter(Login);
