/**
 * Created by amirassad on 6/13/17.
 */
"use strict";

import React from 'react';
import {Image, Row, Col, Well, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCartItem} from '../../actions/cartActions';

class BookItem extends React.Component {
    handleCart(){
        const book = [...this.props.cart, {
            _id: this.props._id,
            title: this.props.title,
            description: this.props.description,
            image: this.props.images,
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
                this.props.updateCartItem(_id, 1, this.props.cart);
            }
        }
        else{
            this.props.addToCart(book);
        }

    }

    constructor () {
        super();
        this.state = {
            isClicked: false
        };
    }
    onReadMore() {
        this.setState({isClicked: true})
    }
    render(){
        return(
            <Well>
                <Row>
                    <Col xs={12} sm={4}>
                        <Image src={this.props.images} responsive />

                    </Col>

                    <Col xs={6} sm={8}>
                        <h6>{this.props.title}</h6>
                        <p>{(this.props.description.length > 18 && this.state.isClicked === false) ?
                            (this.props.description.substring(0,18)) : (this.props.description)}
                            <button className='link' onClick={this.onReadMore.bind(this)}>
                                {(this.state.isClicked === false && this.props.description !== null &&
                                this.props.description.length > 18) ? ('...read more'): ('')}
                            </button>
                        </p>
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