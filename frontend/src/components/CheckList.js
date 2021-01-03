import React, { Component } from 'react';
import { Container, Row, Col, ListGroup, Button, FormInput } from 'shards-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
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
                console.log(res)
                //this.setState({ items: res.data });
            })
            .catch(e => console.log(e));
    }

    completeItem(item) {
        apiClient.patch(`${config.API_URL}/items/${item.pk}/`, {
            complete: true
        })
        .then(res => {
            this.setState(state => {
                return state.items.map(i => {
                    i.complete = (i.pk === item.pk) ? true : i.complete;
                    return i;
                });
              });
        })
        .catch(e => console.log(e));
    }

    unCompleteItem(item) {
        apiClient.patch(`${config.API_URL}/items/${item.pk}/`, {
            complete: false
        })
        .then(res => {
            this.setState(state => {
                return state.items.map(i => {
                    i.complete = (i.pk === item.pk) ? false : i.complete;
                    return i;
                });
              });
        })
        .catch(e => console.log(e));
    }

    deleteItem(item) {
        apiClient.delete(`${config.API_URL}/items/${item.pk}/`)
        .then(res => {
            this.setState(state => {
                const items = state.items.filter(i => i.pk !== item.pk);
                return { items };
            });
        })
        .catch(e => console.log(e));
    }

    updateTitle(item) {
        console.log(`updating title...`);
    }

    editItem(item) {
        console.log(`editing item....${item}`);
    }

    renderActions(item) {
        if (item.complete) {
            return ( <Button variant="default" onClick={() => this.unCompleteItem(item)}>ArrowRepeat</Button> );
        }

        return ( <Button variant="default" onClick={() => this.completeItem(item)}>Check2 </Button> );
    }

    handleAddItemModal() {
        let showModal = !this.state.showAddItemModal;
        this.setState({ showAddItemModal: showModal });
        this.loadItems();
    }

    renderList() {
        return this.state.items.map((item, i) => {
            return (
                    <ListGroup.Item key={i}>
                        <span className={item.complete ? "strikethrough" : ""}>{ item.title }</span>
                        <FormInput type="text" className="change-title" onChange={this.updateTitle(item)} value={ item.title } />
                        <span className="float-right">
                            <Button variant="default" onClick={() => this.editItem(item)}>PencilSquare </Button>
                            { this.renderActions(item) }
                            <Button variant="default" onClick={() => this.deleteItem(item)}>Trash</Button>
                        </span>
                    </ListGroup.Item>
                )
        });
    }

    renderItems() {

        if (this.state.items.length === 0) {
            return (
                <Col sm="12">
                    <div className="no-items">You have no items yet. Click the plus button add one!</div>
                </Col>
            )
        }

        return (
            <Col lg>
                <ListGroup>
                    { this.renderList() }
                </ListGroup>
            </Col>
        )
    }

    render() {
        return (
            <div className="checklist">
                <Container>
                    <Row className="justify-content-md-center mb-5">
                        <Col sm="8">
                            <h2>Your CheckList</h2>
                        </Col>
                        <Col sm="1">
                            <Button variant="light" onClick={() => this.handleAddItemModal()}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        { this.renderItems() }
                    </Row>
                </Container>

                <AddItemModal show={this.state.showAddItemModal} handleAddItemModal={this.handleAddItemModal} />
            </div>
        );
    }
}