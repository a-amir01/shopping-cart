"use strict";

const initialState = {
    cart: [],
    totalAmount: 0,
    totalQty: 0
};

export function cartReducers(state=initialState, action){
    console.log("CARTSREDUCERS");
    switch(action.type){
        case "GET_CART":
            return {...state,
                cart: action.payload,
                totalAmount : totals(action.payload).amount,
                totalQty: totals(action.payload).qty,
            };
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


            return {...state,
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).qty
                };
            break;
    }
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