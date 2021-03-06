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

router.get('/searchUserData', async (req, res) => {
    let { name, ens } = req.query;

    if (!name && !ens) {
        return res.status(400).json({
            name: 'need to have something lol',
        });
    }

    if (!name) {
        name = 'abcdefgaphweoickmewpoanbupaowimcl;kdsknbpoawmcds;kldmschijklmnop';
    }
    if (!ens) {
        ens = 'abcdefgaphweoickmewpoanbupaowimcl;kdsknbpoawmcds;kldmschijklmnop';
    }

    let users = {};
    try {
        users = await User.find({
            $or: [
                { name: { $regex: name, $options: 'i' } },
                { ens: { $regex: ens, $options: 'i' } },
            ],
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
    return res.status(200).json({ success: true, users });
});

router.put('/saveUserData', async (req, res) => {
    const { address, name, ens, github, twitter, profileId, verified } = req.body;
    let user = [];
    try {
        user = await User.findOne({ address });
        if (!user) {
            // no user found, create new user
            user = new User({ address, name, ens, github, twitter, profileId });
        } else {
            // update old db index

            if (name) {
                user.name = name;
            }

            if (ens) {
                user.ens = ens;
            }

            if (github) {
                user.github = github;
            }

            if (twitter) {
                user.twitter = twitter;
            }

            if (profileId) {
                user.profileId = profileId;
            }

            if (verified != null) {
                user.verified = verified;
            }
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

module.exports = router;
