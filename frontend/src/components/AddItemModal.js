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

class AddItemModal extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            show: this.props.show,
            title: '',
            description: '',
            dueDate: '',
            showError: ''
        };
    }

    updateTitle = e => {
        this.setState({ title: e.target.value });
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

        apiClient.post(`${config.API_URL}/items/`, {
            title: this.state.title,
            description: this.state.description,
            due_date: this.state.dueDate
        })
        .then(res => {
            this.props.handleAddItemModal();
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
                <Modal show={this.props.show} onHide={this.props.handleAddItemModal}>
                    <ModalHeader closeButton>Add Item</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup controlId="formTitle">
                                <label htmlFor="title">Title</label>
                                <FormInput id="title" type="text" onChange={this.updateTitle} />
                                <FormFeedback type="invalid">Please enter a title</FormFeedback>
                            </FormGroup>
                            <FormGroup controlId="formDescription">
                                <label htmlFor="description">Description</label>
                                <FormInput id="description" type="text" onChange={this.updateDescription} />
                                <FormFeedback type="invalid">Please enter a description</FormFeedback>
                            </FormGroup>
                            <FormGroup controlId="formDueDate">
                                <label htmlFor="due-date">Due Date</label>
                                <FormInput id="due-date" type="date" onChange={this.updateDueDate} />
                                <FormFeedback type="invalid">Please enter a due date</FormFeedback>
                            </FormGroup>
                        </Form>
                        <p className={this.state.showError ? 'show-error' : 'hide-error'}>Please enter a Title and Description.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="primary" onClick={this.submitForm}>Add</Button>
                        <Button variant="secondary" onClick={this.props.handleAddItemModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddItemModal;
