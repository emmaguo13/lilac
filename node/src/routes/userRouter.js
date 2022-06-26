const express = require('express');
const User = require('../models/User');
const axios = require('axios');
const Data = require('../models/Data');
require('dotenv').config();

const router = express.Router();

// Fetch User Data
router.get('/getUserData', async (req, res) => {
    const { address } = req.query;

    if (!address) {
        return res.status(400).json({
            address: 'Address',
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

router.put('/saveUserData', async (req, res) => {
    const { address, name, ens, github, twitter } = req.body;
    let user = [];
    try {
        user = await User.findOne({ address });
        if (!user) {
            // no user found, create new user
            user = new User({ address, name, ens, github, twitter });
        } else {
            // update old db index
            user.name = name;
            user.ens = ens;
            user.github = github;
            user.twitter = twitter;
        }
        await user.save();
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, error: e });
    }
    return res.status(200).json({ success: true, newUserInfo: user });
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

        adjusted_score = 1000 / (1 + Math.E ** (-0.01 * currentScore));

        let user = await User.findOne({ address });
        user.score = parseInt(adjusted_score);
        await user.save();
        return res.status(200).json({ success: true, score: parseInt(adjusted_score) });
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
});

// Save user data
router.put('/saveUserData', async (req, res) => {
    const { address, name } = req.body;

    let user = [];
    try {
        user = await User.findOne({ address });
        if (!user) {
            // no user found
            // create new user
            user = new User({ address, name });
        } else {
            // update old db index
            user.name = name;
        }
        await user.save();
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, error: e });
    }
    return res.status(200).json({ success: true, newUserInfo: user });
});

module.exports = router;
