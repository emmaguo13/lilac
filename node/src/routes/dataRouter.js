const express = require('express');
const Update = require('../models/Update');
const Data = require('../models/Data');
const User = require('../models/User');
const { request, gql } = require('graphql-request');
const { Octokit, App } = require('octokit');
const { default: axios } = require('axios');

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

router.post('/updateCompoundGitHub', async (req, res) => {
    const { address } = req.body;

    if (!address) {
        return res.status(400).json({
            address: 'Address not found',
        });
    }

    date = new Date(1593124212);
    try {
        let lastFetch = await Update.findOne({ protocol: 'compound-github', address });
        console.log(lastFetch);
        if (lastFetch) {
            date = new Date(lastFetch.time);
            lastFetch.time = Date.now();
        } else {
            lastFetch = new Update({ protocol: 'compound-github', address, time: Date.now() });
        }

        let user = await User.findOne({ address });
        if (!user) {
            return res.status(400).json({
                address: 'No user associated with address',
            });
        }

        let index = user.github.indexOf('github');
        let { data } = await axios.get(
            `https://api.github.com/search/commits?q=+org:compound-finance+author:${user.github.substring(
                index + 11
            )}+author-date:>${date.getFullYear()}-${date.getMonth()}-${date.getDate()} `,
            {
                headers: {
                    Accept: 'application/vnd.github.v3.text-match+json',
                    'User-Agent': 'Lilac',
                },
                auth: {
                    username: 'timg512372',
                    password: process.env.GITHUB_TOKEN,
                },
            }
        );

        data.items.forEach(async (commit) => {
            console.log(commit);
            const datapoint = new Data({
                type: 'commit',
                time: new Date(commit.commit.author.date).getTime(),
                magnitude: 1,
                address,
                protocol: 'compound',
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

// For compound the date will be in terms of blocks
router.post('/updateCompound', async (req, res) => {
    const { address } = req.body;

    if (!address) {
        return res.status(400).json({
            address: 'Address not found',
        });
    }

    let date = 1;

    try {
        let lastFetch = await Update.findOne({ protocol: 'compound', address });
        console.log(lastFetch);
        if (lastFetch) {
            date = lastFetch.time;
            lastFetch.time = Date.now();
        } else {
            lastFetch = new Update({ protocol: 'compound', address, time: Date.now() });
        }

        const proposal_query = gql`
            query getProposals($date: BigInt!, $address: Bytes!) {
                proposals(where: { endBlock_gt: $date, proposer: $address }) {
                    id
                    description
                    status
                    endBlock
                }
            }
        `;

        const { proposals } = await request(
            `https://api.thegraph.com/subgraphs/name/protofire/compound-governance`,
            proposal_query,
            { date: date.toString(), address }
        );

        proposals.forEach(async (proposal) => {
            const datapoint = new Data({
                type: 'propose',
                time: proposal.endBlock,
                magnitude: proposal.status == 'EXECUTED' || proposal.status == 'QUEUED' ? 10 : 1,
                address,
                protocol: 'compound',
            });
            await datapoint.save();
        });

        const vote_query = gql`
            query getVotes($address: Bytes!) {
                votes(where: { voter: $address }) {
                    id
                    voter {
                        id
                    }
                    votesRaw
                    support
                    proposal {
                        status
                        endBlock
                    }
                }
            }
        `;

        const { votes } = await request(
            `https://api.thegraph.com/subgraphs/name/protofire/compound-governance`,
            vote_query,
            { address }
        );
        // console.log(votes);

        votes.forEach(async (vote) => {
            if (vote.proposal.endBlock < date) {
                return;
            }

            const datapoint = new Data({
                type: 'vote',
                time: vote.proposal.endBlock,
                magnitude:
                    (parseFloat(vote.votesRaw) / 10 ** 18) *
                    (vote.support != (vote.proposal.status != 'CANCELLED') ? -1 : 1),
                address,
                protocol: 'compound',
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
