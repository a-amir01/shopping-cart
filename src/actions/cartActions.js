"use strict";

import axios from 'axios';

export function getCart(){
    return (dis)=>{
        axios.get('/api/cart')
            .then((res)=>{
                dis({type:"GET_CART", payload: res.data})
            })
            .catch((err)=>{
                dis({type:"GET_CART_REJECTED", msg:"error getting cart from session" })
            })
    }
}


export function addToCart(cart){
    return (dis)=>{
        axios.post("/api/cart", cart)
            .then((res)=>{
                dis({type:"ADD_TO_CART", payload: res.data});
            })
            .catch((err)=>{
                dis({type: "ADD_TO_CART_REJECTED", msg: 'error when adding'});
            });
    }
    // return {
    //     type: "ADD_TO_CART",
    //     payload: book
    // }
}

export function deleteCartItem(item){
    return (dis)=>{
        axios.post("/api/cart", item)
            .then((res)=>{
                dis({type:"DELETE_CART_ITEM", payload: res.data});
            })
            .catch((err)=>{
                dis({type: "DELETE_CART_ITEM_REJECTED", msg: 'error when deleting'});
            });
    }
    // return {
    //     type: "DELETE_CART_ITEM",
    //     payload: item
    // }
}
export function updateCartItem(_id, unit, cartArr){
    // Create a copy of the current array of books
    const currentBookToUpdate = cartArr;
    // Determine at which index in books array is the book to be deleted
    const indexToUpdate = currentBookToUpdate.findIndex(
        function(cart){
            return cart._id === _id;
        }
    );
    // Create a new book object with the new values and with
    // the same array index of the item we want to replace.
    // To achieve this we will use ...spread but we could use concat methos too
    const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        quantity: currentBookToUpdate[indexToUpdate].quantity + unit
    };

    //use slice to remove the book at the specified index, replace with the new object and concatenate witht he rest of items in the array
    let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
        ...currentBookToUpdate.slice(indexToUpdate + 1)];

    return (dis)=>{
        axios.post("/api/cart", cartUpdate)
            .then((res)=>{
                dis({type:"UPDATE_CART_ITEM", payload: res.data});
            })
            .catch((err)=>{
                dis({type: "UPDATE_CART_REJECTED", msg: 'error when updating'});
            });
    }
}