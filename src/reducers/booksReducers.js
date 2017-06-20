"use strict";

//BOOKS REDUCERS
export function booksReducers(state={
    books:[{
            _id: 1,
            title: 'book title',
            description: 'the description',
            price: 33
        },
        {
            _id: 2,
            title: 'book title',
            description: 'the description',
            price: 444
        }]
    }, action){
        console.log("BOOKSREDUCERS");
        switch(action.type){
            case "GET_BOOKS":
                console.log("fguyguygug");
                let v = {...state, books:[...state.books]}
                console.log("v1:", {books:[...state.books]});
                console.log("v2:", state);
                console.log("v3:", v);
                console.log("v4:", {...state});
                // let books = state.books.concat(action.payload);
                // return {books};
                return {...state, books:[...state.books]}
                break;
            case "POST_BOOK":
                return {...state, books:[...state.books, ...action.payload], msg:'Saved! Click to continue', style:'success', validation:'success'}
                break;
            case "POST_BOOK_REJECTED":
                return {...state, msg:'Please, try again', style:'danger', validation:'error'}
                break;
            case "RESET_BUTTON":
                return {...state, msg:null, style:'primary', validation:null}
                break;
            case "DELETE_BOOK":
                console.log("FUCKKKKKKKK YOUUUUU!!!!!!!!!");
                console.log(...state);
                // Create a copy of the current array of books
                const currentBookToDelete = [...state.books]
                // Determine at which index in books array is the book to be deleted
                const indexToDelete = currentBookToDelete.findIndex(
                    function(book){
                        //console.log(book.id)
                        console.log(action.payload);
                        //2 is not equal to '2'
                        return book._id == action.payload;
                    }
                )
                //use slice to remove the book at the specified index
                return {books: [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)]}
                break;

            case "UPDATE_BOOK":
                // Create a copy of the current array of books
                const currentBookToUpdate = [...state.books];
                // Determine at which index in books array is the book to be deleted
                const indexToUpdate = currentBookToUpdate.findIndex(
                    function(book){
                        return book._id === action.payload._id;
                    }
                )
                // Create a new book object with the new values and with the same array index of the item we want to replace. To achieve this we will use ...spread but we could use concat methos too
                const newBookToUpdate = {
                    ...currentBookToUpdate[indexToUpdate],
                    title: action.payload.title
                }
                // This Log has the purpose to show you how newBookToUpdate looks like
                console.log("what is it newBookToUpdate", newBookToUpdate);
                //use slice to remove the book at the specified index, replace with the new object and concatenate witht he rest of items in the array
                return {books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)]}
                break;
        }
        console.log("BOOKSREDUCERS END");
        //return {...state,  books: []};
        return state
}