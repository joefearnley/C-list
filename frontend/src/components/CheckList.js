import React, { Component } from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { Check2Square, Check2, Trash, ArrowRepeat } from 'react-bootstrap-icons';
import api from '../api';
import Config from "../config";

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
        api.get(`${Config.API_URL}/checklist`)
            .then(res => {
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

    logout() {
        api.post(`${Config.API_AUTH_URL}/logout/`)
            .then(res => {
                localStorage.setItem('token', null);
                this.props.history.push('/');
            })
            .catch(e => console.log(e));    
    }

    renderActions(item) {
        if (item.complete) {
            return ( <Button variant="default" onClick={() => this.unCompleteItem(item)}><ArrowRepeat /></Button> );
        }

        return ( <Button variant="default" onClick={() => this.completeItem(item)}><Check2 /></Button> );
    }

    renderItems() {
        return this.state.items.map((item, i) => {
            return (
                    <ListGroup.Item key={i}>
                        { item.title }
                        <span className="float-right">
                            { this.renderActions(item) }
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
                        <Col lg="auto">
                            <h2>Your CheckList <Check2Square /></h2>
                        </Col>
                        <Col lg="auto">
                            <p><Button variant="link" onClick={() => this.logout()}>Logout</Button></p>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg="auto">
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