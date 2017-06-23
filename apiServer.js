const express = require('express');
// const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//APIs
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop');
const Books = require('./models/books');

app.post('/books', (req, res)=> {  //post request passing an array of books as body
    const book = req.body;  //copy array
    Books.create(book, (err, books) =>{  //set one or more document to database
        "use strict";
        if(err) throw err;

        res.json(books);  //return json with submitted books
    });
});

app.get('/books', (req, res)=> {
    "use strict";
    Books.find((err, books)=>{
        if (err) throw err;

        res.json(books);
    })
});

app.delete('/books/:_id', (req, res)=> {
    "use strict";
    const query = {_id: req.params._id};
    Books.remove(query, (err, books)=> {
        if(err) throw err;

        res.json(books);
    });
});

//TODO:implement this in the shopping car (update)
app.put('/books/:_id', (req, res)=> {
    const book = req.body;
    const query = req.params._id;

    //if the field doesn't exist $set will set a new field
    const update = {
        '$set': {
            title: book.title,
            description: book.description,
            image: book.image,
            price: book.price,
        }
    };

    //when true return updated document
    const options = {new: true};

    Books.findOneAndUpdate(query, update, options, (err, books)=>{
        if(err) {
            console.log("THROWING ERROR\n\n");
            throw err;
        }

        res.json(books);
    });
});
//END APIs


// app.use('/', index);
// app.use('/users', users);

app.listen(3001, (err)=>{
    if(err) return conssole.log(err);

    console.log("API SEVER running on port 3001")
});

