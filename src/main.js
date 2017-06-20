/**
 * Created by amirassad on 6/20/17.
 */

"use strict";

import React from 'react';

import _Menu from './components/menu';
import Footer from './components/footer';

import {connect} from 'react-redux';

class Main extends React.Component {
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
export default connect(mapStateToProps)(Main);