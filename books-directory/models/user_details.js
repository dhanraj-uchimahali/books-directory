const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    last_login_at: {
        type: Date
    },
    expiry: {
        type: Date
    }
}, {
    versionKey: false
}, { timestamps: true })
let User = mongoose.model('user_details', Schema)
module.exports = User