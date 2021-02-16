import React, { Component } from 'react';
import { withRouter } from 'react-router';
import apiClient from '../api';
import config from '../config';
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
} from "shards-react";

class AddItem extends Component {
    constructor(props, context) {
        super(props);

        this.state = {
            title: '',
            description: '',
            dueDate: '',
            showTitleError: false,
            nonfieldError: '',
            showNonFieldError: false
        };
    }

    updateTitle = e => {
        this.setState({
            title: e.target.value,
            showTitleError: false
        });
    }

    updateDesciption = e => {
        this.setState({ description: e.target.value });
    }

    updateDueDate = e => {
        this.setState({ dueDate: e.target.value });
    }

    submitForm = e => {
        e.preventDefault();
        this.setState({ showError: false });

        let postData = {
            title: this.state.title,
            description: this.state.description
        };

        if (this.state.dueDate) {
            postData.due_date = this.state.dueDate;
        }

        apiClient.post(`${config.API_URL}/items/`, postData)
            .then(res => {
                this.props.history.push('/list');
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.data.title) {
                        this.setState({ showTitleError: true })
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
                            <h3 className="mb-4">Add Item</h3>
                            <Form>
                                <FormGroup>
                                    <label htmlFor="title">Title</label>
                                    <FormInput invalid={ this.state.showTitleError } id="title" type="text" onChange={this.updateTitle} />
                                    <FormFeedback type="invalid">Please enter a title</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="description">Description</label>
                                    <FormInput id="description" type="text" onChange={this.updateDescription} />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="due-date">Due Date</label>
                                    <FormInput id="due-date" type="date" onChange={this.updateDueDate} />
                                    <FormFeedback type="invalid">Please enter a due date</FormFeedback>
                                </FormGroup>
                            </Form>
                            <p className={this.state.showNonFieldError ? 'show-error' : 'hide-error'}>
                                { this.state.nonfieldError }
                            </p>

                            <Button variant="primary" className="mr-2" onClick={this.submitForm}>Add</Button>
                            <Button variant="secondary" onClick={() => this.props.history.push('/list')}>Cancel</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default withRouter(AddItem);
