import React, { Component } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

export default class CheckList extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            items: [],
        };
    }

    render() {
        return (
            <div>
            <ListGroup>
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
            </div>
        );
    }
}