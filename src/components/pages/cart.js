/**
 * Created by amirassad on 6/13/17.
 */
"use strict";

import React from 'react';
import {connect} from 'react-redux';
import {Image, Modal, Panel, Col, Row, Well, Grid, Button, ButtonGroup, Label} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCartItem, getCart} from '../../actions/cartActions';

class Cart extends React.Component{

    componentDidMount(){
        this.props.getCart();
    }

    onDelete(_id){
        // Create a copy of the current array of books
        const currentBookToDelete = this.props.cart;
        // Determine at which index in books array is the book to be deleted
        const indexToDelete = currentBookToDelete.findIndex(
            function(item){
                return item._id === _id;
            }
        );
        //use slice to remove the book at the specified index
        const cartAfterDelete = [...currentBookToDelete.slice(0, indexToDelete),
                                 ...currentBookToDelete.slice(indexToDelete + 1)];

        this.props.deleteCartItem(cartAfterDelete);
    }

    onIncrement(_id){
        this.props.updateCartItem(_id, 1, this.props.cart);
    }

    onDecrement(_id, quantity){
        if (quantity > 1)
            this.props.updateCartItem(_id, -1, this.props.cart);
    }

    constructor(){
        super();
        this.state = {
            showModal: false
        }
    }
    open(){
        this.setState({showModal: true});
    }

    close(){
        this.setState({showModal: false});
    }
    render(){
        if(this.props.cart[0]){
            console.log("NOT EMPTY\n");
            return this.renderCart();
        }else{
            console.log("EMPTY\n");
            return this.renderEmpty();
        }

    }
    renderEmpty(){
        return (<div></div>);
    }
    renderCart(){
        const cartItemsList = this.props.cart.map((cartArr)=>{
            return (
                <Panel key={cartArr._id}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <Image className='img' src={cartArr.image}  responsive/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6>{cartArr.title}</h6><span>    </span>
                        </Col>
                        <Col xs={12} sm={6}>
                            <h6>{cartArr.price}</h6>
                        </Col>
                        <Col xs={12} sm={4}>
                            <h6><Label bsStyle="success">{cartArr.quantity}</Label></h6>
                        </Col>
                        <Col xs={12} sm={6}>
                            <ButtonGroup style={{minWidth: '300px'}}>
                                <Button onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)} bsStyle="default" bsSize="small">-</Button>
                                <Button onClick={this.onIncrement.bind(this, cartArr._id)} bsStyle="default" bsSize="small">+</Button>
                                <Button onClick={this.onDelete.bind(this, cartArr._id)} bsStyle="danger" bsSize="small">DELETE</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Panel>
            )
            //to make sure our on click event is in the right context
        }, this);
        return (
            <Panel header="Cart" bsStyle="primary">
                {cartItemsList}
                <Row>
                    <Col xs={12}>
                        <h6>Total amount: {this.props.totalAmount}</h6>
                        <Button onClick={this.open.bind(this)} bsStyle="success" bsSize="small">Proceed to checkout</Button>
                    </Col>
                </Row>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thank you!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>Your order has been saved</h6>
                        <p>You will recieve an email confirmation</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Col xs={6}>
                            <h6>Total: ${this.props.totalAmount}</h6>
                        </Col>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Panel>
        )
    }
}

function mapStateToProps(state){
    return{
        cart: state.cartReducer.cart,
        totalAmount: state.cartReducer.totalAmount,
    }
}
//
function mapDispatchToProps(dispatch){
    return bindActionCreators({
            deleteCartItem : deleteCartItem,
            updateCartItem: updateCartItem,
            getCart: getCart,
        }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

