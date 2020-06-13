import React, { Component } from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default class SignupModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(e) {
    e.preventDefault();
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
        <p><a href="/signup" className="sign-up" onClick={this.handleShow}>Sign up</a></p>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email address" />
                <Form.Text className="text-muted">We will never share your email with anyone else.</Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>Creact Account</Button>
            <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
