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

//LOG
const middleware = applyMiddleware(thunk ,logger);

//gloabl var we use to capture the "intial state"
//from Redux Store in the server and pass it to the Store in the client
const initialState = window.INITIAL_STATE;
//tell the store what its reducer functions are
const store = createStore(reducers, initialState, middleware);

import routes from './routes';

const Routes = (
    //lecture 14
    <Provider store={store}>
        {routes}
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

