import React, { Component } from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { Check2Square, Check2, Trash, ArrowRepeat, Plus } from 'react-bootstrap-icons';
import apiClient from '../api';
import config from "../config";
import AddItemModal from './AddItemModal'

export default class CheckList extends Component {
    constructor(props, context) {
        super(props, context);

        this.completeItem = this.completeItem.bind(this);
        this.unCompleteItem = this.unCompleteItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.handleAddItemModal = this.handleAddItemModal.bind(this);

        this.state = {
            items: [],
            showAddItemModal: false
        };
    }

    componentDidMount() {
        this.loadItems();
    }

    loadItems() {
        apiClient.get(`${config.API_URL}/items/`)
            .then(res => {
                this.setState({ items: res.data });
            })
            .catch(e => console.log(e));
    }

    completeItem(item) {
        apiClient.patch(`${config.API_URL}/items/${item.id}/`, {
            complete: true
        })
        .then(res => {
            console.log(res);
            console.log('item completed.')
        })
        .catch(e => console.log(e));
    }

    unCompleteItem(item) {
        apiClient.patch(`${config.API_URL}/items/${item.id}/`, {
            complete: false
        })
        .then(res => {
            console.log(res);
            console.log('item UNcompleted.')
        })
        .catch(e => console.log(e));
    }

    deleteItem(item) {
        apiClient.delet(`${config.API_URL}/items/${item.id}/`)
        .then(res => {
            console.log(res);
            console.log('item deleted.')
        })
        .catch(e => console.log(e));
    }

    renderActions(item) {
        if (item.complete) {
            return ( <Button variant="default" onClick={() => this.unCompleteItem(item)}><ArrowRepeat /></Button> );
        }

        return ( <Button variant="default" onClick={() => this.completeItem(item)}><Check2 /></Button> );
    }

    handleAddItemModal() {
        let showModal = !this.state.showAddItemModal;
        this.setState({ showAddItemModal: showModal });
        this.loadItems();
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
                        <Col sm="8">
                            <h2>Your CheckList <Check2Square /></h2>
                        </Col>
                        <Col sm="1">
                            <p><Button variant="light" onClick={() => this.handleAddItemModal()}><Plus /></Button></p>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg>
                            <ListGroup>
                                { this.renderItems() }
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>

                <AddItemModal show={this.state.showAddItemModal} handleAddItemModal={this.handleAddItemModal} />
            </div>
        );
    }
}