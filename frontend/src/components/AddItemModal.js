import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import api from 'axios';

class AddItemModal extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            title: '',
            description: '',
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

    updateTitle = e => {
        this.setState({ title: e.target.value });
    }

    updateDesciption = e => {
        this.setState({ description: e.target.value });
    }

    submitForm = e => {
        e.preventDefault();
        this.setState({ showError: false });

        axios.post(`${api.baseURL}/checklist/additem`, {
            username: this.state.username,
            password: this.state.password
        })
        .then(res => {
            localStorage.setItem('token', res.data.key);
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
                <Modal show={this.state.show} onHide={this.handleClose}>
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
                                <Form.Label>Desciption</Form.Label>
                                <Form.Control type="password" onChange={this.updatePDescription} />
                                <Form.Control.Feedback type="invalid">Please enter a description</Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                        <p className={this.state.showError ? 'show-error' : 'hide-error'}>Please enter a Title and Description.</p>
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
