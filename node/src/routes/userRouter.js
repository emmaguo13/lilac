const express = require('express');
const User = require('../models/User');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

router.get('/', async (req, res) => {
    const { address, ens } = req.query;

    if (!address && !ens) {
        return res.status(400).json({
            address: 'Address / ENS not found',
        });
    }

    let user = {};
    try {
        user = await User.findOne({ address });
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }

    return res.status(200).json({ success: true, user });
});

router.post('/createUser', async (req, res) => {
    const { name, ens, address, github, twitter } = req.body;

    if (!name) {
        return res.status(400).json({
            name: 'Name not found',
        });
    } else if (!address) {
        return res.status(400).json({
            address: 'School not found',
        });
    } else if (!github) {
        return res.status(400).json({
            github: 'Github not found',
        });
    } else if (!twitter) {
        return res.status(400).json({
            twitter: 'Twitter not found',
        });
    }

    try {
        let newUser = new User({ name, ens, address, github, twitter });
        await newUser.save();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }

    return res.status(200).json({ success: true });
});

module.exports = router;
