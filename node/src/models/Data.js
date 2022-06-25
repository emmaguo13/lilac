require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');

const dataSchema = new mongoose.Schema({
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
    time: {
        type: Date,
    },
    type: {
        type: String,
        required: true,
    },
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
