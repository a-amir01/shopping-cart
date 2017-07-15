const express = require('express');
// const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//APIs
const mongoose = require('mongoose');
mongoose.connect('mongodb://testUser:test@ds031277.mlab.com:31277/bookshop');
// mongoose.connect('mongodb://localhost:27017/bookshop');


const db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDb - connection error: '));
//set up session
app.use(session({
    secret: "mySecretString",  //used to sign session id cookie
    saveUninitialized: false,  //only if cart is updated
    resave: false, //session wont be resaved if it didnt change
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 2}, //2 days in mili seconds
    store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 6})
    //ttl: 2 days * 24 hours * 60 min * 60 sec
}));

app.post('/cart', (req, res)=>{
    const cart = req.body;
    req.session.cart = cart;
    req.session.save((err)=>{
        if(err) throw err;
        res.json(req.session.cart);
    });
});

app.get('/cart', (req, res)=>{
    if(typeof req.session.cart !== 'undefined'){
        res.json(req.session.cart);
    }
});
//end session
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
        if(err) {
            console.log("ERRORR!!!!!!!!!!!!!!");
            // throw err;
        }

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

app.get('/images', (req, res)=>{
    const imgFolder = __dirname + '/public/images';
    const fs = require('fs');
    fs.readdir(imgFolder, (err, files)=>{
        if(err) console.error(err);

        const filesArr = [];
        files.forEach((file)=>{
            //replace all spaces with _
            //replace(/ /g, '_')
            filesArr.push({name:file});
        });
        //send the json response with the array
        res.json(filesArr);
    });

});

// app.use('/', index);
// app.use('/users', users);

app.listen(3001, (err)=>{
    if(err) return conssole.log(err);

    console.log("API SEVER running on port 3001")
});

