require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');

const dataSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEthereumAddress(value)) {
                throw new Error('Address is invalid');
            }
        },
    },
    time: {
        type: Number,
    },
    type: {
        type: String,
        required: true,
    },
    magnitude: {
        type: Number,
        required: true,
    },
    protocol: {
        type: String,
        required: true,
    },
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
