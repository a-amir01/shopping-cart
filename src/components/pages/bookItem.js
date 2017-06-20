/**
 * Created by amirassad on 6/13/17.
 */
"use strict";

import React from 'react';
import {Row, Col, Well, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCartItem} from '../../actions/cartActions';

class BookItem extends React.Component {
    handleCart(){
        const book = [...this.props.cart, {
            _id: this.props._id,
            title: this.props.title,
            description: this.props.description,
            price: this.props.price,
            quantity: 1
        }];

        //cart empty?
        if(this.props.cart.length > 0){
            let _id = this.props._id;
            const cartIndex = this.props.cart.findIndex((cart)=>{
                return cart._id === _id;
            });
            if(cartIndex === -1){
                this.props.addToCart(book);
            }else{
                //update quantity
                this.props.updateCartItem(_id, 1);
            }
        }
        else{
            this.props.addToCart(book);
        }

    }
    render(){
        return(
            <Well>
                <Row>
                    <Col>
                        <h6>{this.props.title}</h6>
                        <p>{this.props.description}</p>
                        <h6>{this.props.price}</h6>
                        <Button onClick={this.handleCart.bind(this)} bsStyle='primary'>Buy now</Button>
                    </Col>
                </Row>
            </Well>
        )
    }
}

function mapStateToProps(state){
    return {
        cart: state.cartReducer.cart
    }
}

function mapDispatchToProps(dispatch){
    console.log("mapDispatchToProps");
    return bindActionCreators({
        addToCart : addToCart,
        updateCartItem : updateCartItem
        }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(BookItem);