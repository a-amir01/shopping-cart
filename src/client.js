"use strict";

import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import {applyMiddleware, createStore} from 'redux';

import logger from 'redux-logger';
//allows you to write action creators that return a function instead of an action
import thunk from 'redux-thunk';

import reducers from './reducers/index';

import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';

//LOG
const middleware = applyMiddleware(thunk ,logger);

//tell the store what its reducer functions are
const store = createStore(reducers, middleware);


import BooksList from './components/pages/booksList';
import BooksForm from './components/pages/booksForm';
import Cart from './components/pages/cart';
import Main from './main';

const Routes = (
    //lecture 14
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                {/*render by default*/}
                <IndexRoute component={BooksList}/>
                {/*routes for the rest of children component*/}
                <Route path="/admin" component={BooksForm}/>
                <Route path="/cart" component={Cart}/>
            </Route>
        </Router>
    </Provider>
);

render(Routes ,document.getElementById('app'));


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

