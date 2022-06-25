const express = require('express');
const Update = require('../models/Update');
const Data = require('../models/Data');
const { request, gql } = require('graphql-request');
require('dotenv').config();

const router = express.Router();

router.get('/', async (req, res) => {
    const { address, protocol, startingTime, endingTime } = req.query;

    if (!address) {
        return res.status(400).json({
            address: 'Address not found',
        });
    } else if (!protocol) {
        return res.status(400).json({
            protocol: 'Protocol not found',
        });
    }

    let documents = [];
    try {
        documents = await Data.find({ address, protocol });
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }

    return res.status(200).json({ success: true, documents });
});

router.post('/updateSushi', async (req, res) => {
    const { address } = req.body;

    if (!address) {
        return res.status(400).json({
            address: 'Address not found',
        });
    }

    let date = 1;

    try {
        let lastFetch = await Update.findOne({ protocol: 'sushi', address });
        console.log(lastFetch);
        if (lastFetch) {
            date = lastFetch.time;
            lastFetch.time = Date.now();
        } else {
            lastFetch = new Update({ protocol: 'sushi', address, time: Date.now() });
        }

        const swap_query = gql`
            query getSwaps($date: BigInt!, $address: Bytes!) {
                swaps(where: { timestamp_gt: $date, to: $address }) {
                    id
                    timestamp
                    amountUSD
                }
            }
        `;

        const variables = { date: date, address };

        const { swaps } = await request(
            `https://gateway.thegraph.com/api/${process.env.GRAPH}/subgraphs/id/D7azkFFPFT5H8i32ApXLr34UQyBfxDAfKoCEK4M832M6`,
            swap_query,
            variables
        );

        swaps.forEach(async (swap) => {
            const datapoint = new Data({
                type: 'swap',
                time: swap.timestamp,
                magnitude: swap.amountUSD,
                address,
                protocol: 'sushi',
            });
            await datapoint.save();
        });

        await lastFetch.save();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }

    return res.status(200).json({ success: true });
});

router.post('/updatedydx', async (req, res) => {
    const { address } = req.body;

    if (!address) {
        return res.status(400).json({
            address: 'Address not found',
        });
    }

    let date = 1;

    try {
        let lastFetch = await Update.findOne({ protocol: 'dydx', address });
        console.log(lastFetch);
        if (lastFetch) {
            date = lastFetch.time;
            lastFetch.time = Date.now();
        } else {
            lastFetch = new Update({ protocol: 'dydx', address, time: Date.now() });
        }

        const long_query = gql`
            query getLongs($date: BigInt!, $address: Bytes!) {
                longPositions(where: { created_gt: $date, accountOwner: $address }) {
                    id
                    created
                    amount
                }
            }
        `;

        const variables = { date: date.toString(), address };

        const { longPositions } = await request(
            `https://api.thegraph.com/subgraphs/name/protofire/dydx`,
            long_query,
            variables
        );

        longPositions.forEach(async (long) => {
            const datapoint = new Data({
                type: 'long',
                time: long.created,
                magnitude: long.amount,
                address,
                protocol: 'dydx',
            });
            await datapoint.save();
        });

        const short_query = gql`
            query getShorts($date: BigInt!, $address: Bytes!) {
                shortPositions(where: { created_gt: $date, accountOwner: $address }) {
                    id
                    created
                    amount
                }
            }
        `;

        const { shortPositions } = await request(
            `https://api.thegraph.com/subgraphs/name/protofire/dydx`,
            short_query,
            variables
        );

        shortPositions.forEach(async (short) => {
            const datapoint = new Data({
                type: 'short',
                time: short.created,
                magnitude: short.amount,
                address,
                protocol: 'dydx',
            });
            await datapoint.save();
        });

        await lastFetch.save();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }

    return res.status(200).json({ success: true });
});

module.exports = router;
