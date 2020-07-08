import React, { Component } from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { Check2Square, Check2, Trash, ArrowRepeat } from 'react-bootstrap-icons';
import axios from 'axios';

export default class CheckList extends Component {
    constructor(props, context) {
        super(props, context);

        this.completeItem = this.completeItem.bind(this);
        this.unCompleteItem = this.unCompleteItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.loadItems();
    }

    loadItems() {
        const headers = {
            'Authorization': `Token ${localStorage.getItem('token')}`
        };

        axios.get(`/users/`, { headers })
        .then(res => {
            console.log('fetching user items....');
            console.log(res.data);
            this.setState({ items: res.data });
        })
        .catch(e => console.log(e));
    }

    completeItem(item) {
        console.log('completing item.');
        console.log(item);
    }

    unCompleteItem(item) {
        console.log('UN completing item.');
        console.log(item);
    }

    deleteItem(item) {
        console.log('deleting item');
        console.log(item);
    }

    renderItems() {
        return this.state.items.map((item, i) => {
            return (
                    <ListGroup.Item key={i}>
                        { item.title }
                        <span className="float-right">
                            {item.complete
                                ? <Button variant="default" onClick={() => this.completeItem(item)}><Check2 /></Button>
                                : <Button variant="default" onClick={() => this.unCompleteItem(item)}><ArrowRepeat  /></Button>}
                            <Button variant="default" onClick={() => this.deleteItem(item)}><Trash /></Button>
                        </span>
                    </ListGroup.Item>
                )
        });
    }

    render() {
        return (
            <div className="checklist">
                <Container>
                    <Row className="justify-content-md-center">
                        <Col sm="auto">
                            <h2>Your CheckList <Check2Square /></h2>
                        </Col>
                        <Col sm="auto">
                            <p><a href="/logout">Logout</a></p>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <ListGroup>
                                { this.renderItems() }
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}