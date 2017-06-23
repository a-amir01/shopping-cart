"use strict";

import axios from 'axios';

//get books
export function getBooks(){
    return (dispatch)=>{
        axios.get("api/books")
            .then((res)=> {
                dispatch({type: "GET_BOOKS", payload: res.data})
            })
            .catch((err)=>{
                dispatch({type: "GET_BOOKS_REJECTED", payload: err})
            })
    };
    // console.log("GETBOOKS!");
    // return {
    //     type: "GET_BOOKS"
    // }
}

//post a book

export function postBooks(book){
    return function(dispatch){
        axios.post("api/books", book)
            .then((response)=>{
                dispatch({type:"POST_BOOK", payload: response.data})
            })
            .catch((err)=>{
                dispatch({type: "POST_BOOK_REJECTED", payload: "there was an error while posting a new book"})
            })
    }
    // return {
    //     type: "POST_BOOK",
    //     payload: book
    // }
}

export function deleteBooks(id){
    return (dis)=>{
        console.log("AMIDNDNDNDNND");
        console.log(id);
        axios.delete("api/books/" + id)
            .then((res)=>{
                dis({type: "DELETE_BOOK", payload: id})
            })
            .catch((err)=>{
                dis({ type: "DELETE_BOOK_REJECTED", payload: err})
            })

    }
    // return {
    //     type: "DELETE_BOOK",
    //     payload: id
    // }
}

export function updateBooks(book) {
    return {
        type: "UPDATE_BOOK",
        payload: book
    }
}

export function resetButton(){
    return {
        type: "RESET_BUTTON",
    }
}