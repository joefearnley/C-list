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
            items: [{
                title: 'Test',
                description: 'This is a test',
                complete: true
            },{
                title: 'Test 2',
                description: 'This is a test',
                complete: false
            }],
        };
    }

    componentDidMount() {
        this.loadItems();
    }

    loadItems() {
        axios.post(`/user/items`)
            .then(res => {
                console.log('fetching account items....');
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
                        <Col md="auto">
                            <h2>Your CheckList <Check2Square /></h2>
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