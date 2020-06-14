import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Navigation from './Navigation.js'

export default class CheckList extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            items: [],
        };
    }

    render() {
        return (
            <div className="checklist">
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <h2>Your CheckList</h2>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <ListGroup>
                                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}