const express = require('express');
const User = require('../models/User');
const axios = require('axios');
const Data = require('../models/Data');
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

// Go update the compound user thing beforehand
router.post('/updateCompoundCredit', async (req, res) => {
    const { address } = req.body;
    // req.url = '/data/updateCompound';

    try {
        // await app._router.handle(req, res, next);

        let records = await Data.find({ address, protocol: 'compound' });
        let currentScore = 0;
        records.forEach((record) => {
            if (record.type == 'proposal') {
                currentScore += record.magnitude;
            } else if (record.type == 'vote') {
                currentScore += record.magnitude;
            } else {
                currentScore += record.magnitude * 10; // core devs should be rewarded for their commits
            }
        });

        adjusted_score = 1000 / (1 + Math.E ** (-0.1 * currentScore));

        let user = await User.findOne({ address });
        user.score = parseInt(adjusted_score);
        await user.save();
        return res.status(200).json({ success: true, score: parseInt(adjusted_score) });
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
});

module.exports = router;
