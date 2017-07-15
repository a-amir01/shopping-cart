"use strict";

import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import BooksList from './components/pages/booksList';
import BooksForm from './components/pages/booksForm';
import Cart from './components/pages/cart';
import Main from './main';

const routes = (
    //lecture 14

        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                {/*render by default*/}
                <IndexRoute component={BooksList}/>
                {/*routes for the rest of children component*/}
                <Route path="/admin" component={BooksForm}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/about" component={BooksList}/>
                <Route path="/contact" />
            </Route>
        </Router>

);

export default routes;

// store.subscribe(() =>{
//     console.log('current state is: ', store.getState());
// });


// store.dispatch(deleteBooks({id: 1}));
// //
// store.dispatch(updateBooks(
//     {
//         id: 2,
//         title: 'Learn React in 24h'
//     }
// ));
//
//
// //-->>CART ACTIONS
// //add to cart
// store.dispatch(addToCart([{id: 343}]));

