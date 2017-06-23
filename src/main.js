/**
 * Created by amirassad on 6/20/17.
 */

"use strict";

import React from 'react';

import _Menu from './components/menu';
import Footer from './components/footer';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCart} from '../src/actions/cartActions';

class Main extends React.Component {
    componentDidMount(){
        this.props.getCart();
    }
    render(){
        return(
            <div>
                <_Menu cartItemsNumber={this.props.totalQty}/>
                    {/*Render all childeren components*/}
                    {this.props.children}
                <Footer />
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        totalQty: state.cartReducer.totalQty,
    }
}

//so when you have a cart you can go on any page and still have the number of items
//in the cart
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getCart: getCart,
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);