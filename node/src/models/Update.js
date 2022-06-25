require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');
const Data = require('./Data');

const updateSchema = new mongoose.Schema({
    time: {
        type: Number,
        required: true,
    },
    protocol: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEthereumAddress(value)) {
                throw new Error('Address is invalid');
            }
        },
    },
});

const Update = mongoose.model('Update', updateSchema);

module.exports = Update;
