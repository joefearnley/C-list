import React, { Component } from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default class LoginModal extends Component {
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

  submitForm(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <p class="aleady-a-user">
          Already a user? <a href="/signin" class="sign-in" onClick={this.handleShow}> Sign in</a>
        </p>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form>
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
