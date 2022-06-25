require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEthereumAddress(value)) {
                throw new Error('Address is invalid');
            }
        },
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    ens: {
        type: String,
        trim: true,
    },

    github: {
        type: String,
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error('Github URL is invalid');
            }
        },
    },
    twitter: {
        type: String,
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error('Twitter URL is invalid');
            }
        },
    },
    score: {
        type: Number,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
