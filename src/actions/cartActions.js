"use strict";

export function addToCart(book){
    return {
        type: "ADD_TO_CART",
        payload: book
    }
}

export function deleteCartItem(item){
    return {
        type: "DELETE_CART_ITEM",
        payload: item
    }
}
export function updateCartItem(_id, unit){
    return {
        type: "UPDATE_CART_ITEM",
        _id: _id,
        unit: unit
    }
}