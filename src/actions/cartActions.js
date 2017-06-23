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
    const cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
        ...currentBookToUpdate.slice(indexToUpdate + 1)];

    return {
        type: "UPDATE_CART_ITEM",
        payload: cartUpdate,
    }
}