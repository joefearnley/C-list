import React, { Component } from 'react';
import apiClient from '../api';
import config from "../config";
import Navigation from './Navigation';
import AddItemModal from './AddItemModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faRedo, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
    Container,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Button,
    // FormInput
} from 'shards-react';

export default class CheckList extends Component {
    constructor(props, context) {
        super(props);

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
            .catch(err => {
                if(err.response) {
                    // redirect to login page....
                }
            });
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
            return ( 
                <Button className="mr-2" size="sm" theme="secondary" onClick={() => this.unCompleteItem(item)}>
                    <FontAwesomeIcon icon={faRedo} />
                </Button>
            );
        }

        return ( 
            <Button className="mr-2" size="sm" theme="secondary" onClick={() => this.completeItem(item)}>
                <FontAwesomeIcon icon={faCheck} />
            </Button> 
        );
    }

    handleAddItemModal() {
        let showModal = !this.state.showAddItemModal;
        this.setState({ showAddItemModal: showModal });
        this.loadItems();
    }

    renderList() {
        return this.state.items.map((item, i) => {
            return (
                    <ListGroupItem key={i}>
                        <span className={item.complete ? "strikethrough" : ""}>{ item.title }</span>
                        {/* <FormInput type="text" className="change-title" onChange={this.updateTitle(item)} value={ item.title } /> */}
                        <span className="float-right">
                            <Button size="sm" className="mr-2" theme="info" onClick={() => this.editItem(item)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            { this.renderActions(item) }
                            <Button size="sm" className="mr-2" theme="danger" onClick={() => this.deleteItem(item)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </span>
                    </ListGroupItem>
                )
        });
    }

    renderItems() {
        if (this.state.items.length === 0) {
            return (
                <Col sm="12">
                    <div className="text-center no-items">You have no items yet. Click the plus button add one!</div>
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
                <Navigation />
                <Container>
                    <Row className="justify-content-md-center mb-5">
                        <Col sm="9">
                            <h2>Your CheckList</h2>
                        </Col>
                        <Col sm="1">
                            <Button theme="light" onClick={() => this.handleAddItemModal()}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        { this.renderItems() }
                    </Row>
                </Container>

                <AddItemModal open={this.state.showAddItemModal} handleAddItemModal={this.handleAddItemModal} />
            </div>
        );
    }
}