"use strict";

const initialState = {
    cart: [],
    totalAmount: 0,
    totalQty: 0
};

export function cartReducers(state=initialState, action){
    console.log("CARTSREDUCERS");
    switch(action.type){
        case "ADD_TO_CART":
            return {...state,
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).qty
                };
            break;
        case "DELETE_CART_ITEM":
            return {...state,
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).qty
                };
            break;
        case "UPDATE_CART_ITEM":
            // Create a copy of the current array of books
            const currentBookToUpdate = [...state.cart];
            // Determine at which index in books array is the book to be deleted
            const indexToUpdate = currentBookToUpdate.findIndex(
                function(cart){
                    return cart._id === action._id;
                }
            )
            // Create a new book object with the new values and with
            // the same array index of the item we want to replace.
            // To achieve this we will use ...spread but we could use concat methos too
            const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate],
                quantity: currentBookToUpdate[indexToUpdate].quantity + action.unit
            }

            //use slice to remove the book at the specified index, replace with the new object and concatenate witht he rest of items in the array
            const cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
                                ...currentBookToUpdate.slice(indexToUpdate + 1)];

            return {...state,
                cart: cartUpdate,
                totalAmount: totals(cartUpdate).amount,
                totalQty: totals(cartUpdate).qty
                };
            break;
    }
    console.log("FUCK YOU\n");
    console.log(state);
    return state;
}

export function totals(payloadArr){
    const totalAmount = payloadArr.map((cartArr)=>{
        return cartArr.price * cartArr.quantity;
    }).reduce((a,b)=>{ //sum all the prices in the cart
        return a + b;
    }, 0); //start summing from 0

    const totalQty = payloadArr.map((qty) =>{
        return qty.quantity;
    }).reduce((a,b) =>{ return a + b }, 0);

    return { amount: totalAmount.toFixed(2), qty: totalQty};
}