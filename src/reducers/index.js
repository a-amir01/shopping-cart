//code for combining the reducers

"use strict";

import {combineReducers} from 'redux';

import {booksReducers} from './booksReducers';
import {cartReducers} from './cartReducers';

//takes object as input
//the object represents the ******state object******
//so import all reducers and have them under one single object
export default combineReducers({
    booksReducer: booksReducers,
    cartReducer: cartReducers
})

//export default combineReducers({booksReducers, cartReducers});
//
// state:{
//     booksReducer: {
//         books:[ ]
//     }
//     cartsReducer: {
//         carts: [ ]
//     }
// }