/**
 * Created by amirassad on 7/13/17.
 */

"use strict";

import axios from 'axios';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
//render react components to a string
import {renderToString} from 'react-dom/server';
//methods used to enable react router on the server
import {match, RouterContext} from 'react-router';

import reducers from './src/reducers/index';
import routes from './src/routes';

function handleRender(req, res){
    axios.get('http://localhost:3001/books')
        .then((response) => {

            // let myHtml = JSON.stringify(response.data);
            // res.render('index', {myHtml});

            //1 create a redux store on server
            const store = createStore(reducers, {"booksReducer": {"books": response.data}});

            //2 get initial state from the store
            //need to before when we allow frontend code to run in the server
            //could be exposed to javascript injection attacks .replace mitigates this risk
            //need careful varidation from any input from any form if using server side rendering
            const initialState = JSON.stringify(store.getState())
                .replace(/<\/script/g,'<\\/script')
                .replace(/<!--/g, '<\\!--');
            //3 implement react-router on the server to intercept
            //client requests and define what to do with them
            const Routes = {
                routes: routes,
                location: req.url,
            }
            match(Routes, (err, redirect, props)=>{
                if(err){
                    res.status(500).send("Error fulfilling the request");
                }else if (redirect){
                    res.status(302, redirect.pathname + redirect.search);
                }else if(props){
                    const reactComponent = renderToString(
                        <Provider store={store}>
                            <RouterContext {...props}/>
                        </Provider>
                    )
                    res.status(200).render('index', {reactComponent, initialState});
                }else{
                    res.status(404).render('Not found');
                }
            })
        })
        .catch((err)=>{
            console.log('#Intial Server-size rendering error', err);
        })




}

module.exports = handleRender;