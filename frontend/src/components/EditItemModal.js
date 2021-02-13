import React, { Component } from 'react';
import apiClient from '../api';
import config from '../config';
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

class EditItemModal extends Component {
    constructor(props, context) {
        super(props);

        this.state = {
            open: this.props.open,
            title: '',
            description: '',
            dueDate: '',
            showTitleError: false,
            nonfieldError: '',
            showNonFieldError: false
        };
    }

    updateTitle = e => {
        if (e.target.value !== '') {
            this.setState({
                title: e.target.value,
                showTitleError: false
            });
        }
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
            // reset add item form and close modal
            this.setState({
                title: '',
                description: '',
                dueDate: '',
                showTitleError: false,
                nonfieldError: '',
                showNonFieldError: false
            });
            this.props.handleEditItemModal();
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
                <Modal open={this.props.open} onHide={this.props.handleEditItemModal}>
                    <ModalHeader>Add Item</ModalHeader>
                    <ModalBody>
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
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="primary" onClick={this.submitForm}>Add</Button>
                        <Button variant="secondary" onClick={this.props.handleEditItemModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default EditItemModal;
