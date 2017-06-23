/**
 * Created by amirassad on 6/23/17.
 */

"use strict";

const mongoose = require('mongoose');

const booksSchema = mongoose.Schema({
    title: String,
    description: String,
    images: String,
    price: Number,

});

const Books = mongoose.model('Books', booksSchema);

module.exports = Books;

