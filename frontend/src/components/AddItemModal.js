import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import apiClient from '../api';
import config from '../config';

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
                    <Modal.Header closeButton>
                        <Modal.Title>Add Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" onChange={this.updateTitle} />
                                <Form.Control.Feedback type="invalid">Please enter a title</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" onChange={this.updateDescription} />
                                <Form.Control.Feedback type="invalid">Please enter a description</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formDueDate">
                                <Form.Label>Due Date</Form.Label>
                                <Form.Control type="date" onChange={this.updateDueDate} />
                                <Form.Control.Feedback type="invalid">Please enter a due date</Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                        <p className={this.state.showError ? 'show-error' : 'hide-error'}>Please enter a Title and Description.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.submitForm}>Add</Button>
                        <Button variant="secondary" onClick={this.props.handleAddItemModal}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default AddItemModal;
