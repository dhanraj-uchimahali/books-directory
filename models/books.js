const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    release_date: {
        type: String,
        required: true
    },
    genre: {
        type: String
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    is_active:{
        type: Boolean,
        default: 1
    },
    is_deleted:{
        type: Boolean,
        default: 0
    }
}, {
    versionKey: false
}, { timestamps: true });

let Books = mongoose.model("books", Schema)
module.exports = Books;
