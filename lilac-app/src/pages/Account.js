import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Button, Tabs, Input, Upload, message, Card, Col, Row } from 'antd';
import WhiteBackground from '../components/WhiteBackground.js';
import UserContext from '../UserContext';
import { getPublications } from '../tools/get-pubs';
import { getProfile } from '../tools/get-profile';
import worldID from '@worldcoin/id';
import { ethers } from 'ethers';
const erc20 = require('../utils/erc20.json');
const secret = require('../secret.json');

function capitalize(str) {
    if (str === 'dydx') {
        return 'dYdX';
    }
    if (str.length === 0) {
        return '';
    }
    return str[0].toUpperCase() + str.substring(1);
}

function Account({ address }) {
    const { web3 } = useContext(UserContext);

    const walletAddr = address.slice(0, 6) + '...' + address.slice(-5, -1);

    const [name, setName] = useState('Test Name');
    const [reputationScore, setReputationScore] = useState(500);
    const [githubUsername, setGithubUsername] = useState('@TestUsername');
    const [events, setEvents] = useState([]);
    const [ens, setEns] = useState('');
    const [verified, setVerified] = useState(false);
    const [claimed, setClaimed] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            console.log('fetching data');
            const compound = await axios.get(`${process.env.REACT_APP_SERVER_URL}api/data/`, {
                params: {
                    address,
                    protocol: 'compound',
                },
            });
            const dydx = await axios.get(`${process.env.REACT_APP_SERVER_URL}api/data/`, {
                params: { address, protocol: 'dydx' },
            });

            setEvents([...compound.data.documents, ...dydx.data.documents]);
        };

        const fetchUser = async () => {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}api/user/updateCompoundCredit`, {
                address,
            });

            const { data } = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}api/user/getUserData`,
                {
                    params: { address },
                }
            );

            setReputationScore(data.user.score);
            setName(data.user.name);
            setGithubUsername(data.user.github);
            setEns(data.user.ens);
            setVerified(data.user.verified);
        };

        fetchEvents();
        fetchUser();
    }, [address]);

    console.log(walletAddr);
    console.log(githubUsername);
    console.log(name);

    const handleSubmit = async () => {
        await axios.put(`${process.env.REACT_APP_SERVER_URL}api/user/saveUserData`, {
            address,
            github: githubUsername,
            name,
        });
        console.log('updated');
    };

    const handleRewards = async () => {
        console.log('bean');
        const provider = await ethers.getDefaultProvider(
            'https://polygon-mumbai.g.alchemy.com/v2/1S7Pw1lhm1h18XHHFB6F52uLiGdtR1Bm'
        );
        let wallet = new ethers.Wallet(secret.priv);
        const walletSigner = wallet.connect(provider);
        const matic = '0x0000000000000000000000000000000000001010';
        const maticContract = new ethers.Contract(matic, erc20, provider);
        const gasPrice = provider.getGasPrice();
        const toSend = (reputationScore / 1000) * 0.02 * (10 * 10);
        console.log(toSend);
        const send = await maticContract.connect(walletSigner).transfer(address, toSend);
        send.wait();
        console.log(send);
        setClaimed(true);
    };

    const getLensPublications = async (request) => {
        const userStruct = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}api/user/getUserData?address=${address}`
        );
        const result = await getPublications({
            profileId: userStruct.data.profileId,
            publicationTypes: ['POST', 'COMMENT', 'MIRROR'],
        });

        console.log(result.data);
    };

    useEffect(() => {
        const profile = async (request) => {
            console.log('fetching lens data');
            const userStruct = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}api/user/getUserData?address=${address}`
            );
            console.log(userStruct);
            const result = await getProfile({
                handle: userStruct.data.user.name + '.test',
            });
            console.log(result);
            await axios.put(`${process.env.REACT_APP_SERVER_URL}api/user/saveUserData`, {
                address,
                profileId: result.data.id,
            });
        };

        profile();
    }, []);

    return (
        <div className="form" style={{ marginBottom: '1vh', fontWeight: '700' }}>
            <div style={{ fontSize: '40px', fontWeight: '700' }}>My Profile</div>
            <div className="contents-align">
                <div className="form-display">
                    <div
                        style={{
                            position: 'absolute',
                            zIndex: '-1',
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: '50vw',
                        }}
                    >
                        <WhiteBackground />
                    </div>
                    <div
                        style={{
                            zIndex: '1',
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            height: '100%',
                            padding: '0 5vw 0 5vw',
                            marginTop: '2vh',
                            width: '30vw',
                        }}
                    >
                        <div style={{ fontSize: '15px', marginTop: '2vh' }}>Name</div>
                        {address == web3[[0]] ? (
                            <Input
                                style={{ borderRadius: '1vw', size: 'small' }}
                                onChange={(event) => setName(event.target.value)}
                                value={name}
                            />
                        ) : (
                            <h3>{name}</h3>
                        )}

                        <div style={{ fontSize: '15px', marginTop: '2vh' }}>Wallet Address</div>
                        <h3>{walletAddr}</h3>

                        <div style={{ fontSize: '15px', marginTop: '2vh' }}>GitHub Username</div>
                        {address == web3[[0]] ? (
                            <Input
                                style={{ borderRadius: '1vw', size: 'small' }}
                                onChange={(event) => setGithubUsername(event.target.value)}
                                value={githubUsername}
                            />
                        ) : (
                            <h3>{githubUsername}</h3>
                        )}

                        <div style={{ fontSize: '15px', marginTop: '2vh' }}>Reputation Score</div>
                        <h2>{reputationScore}/1000</h2>

                        <Button
                            variant="primary"
                            type="submit"
                            onClick={handleSubmit}
                            className="button button--secondary"
                        >
                            SAVE
                        </Button>
                    </div>
                </div>
            </div>
            <div style={{ fontSize: '20px', marginBottom: '0vh', fontWeight: '700' }}>Activity</div>

            <div
                className="site-card-wrapper"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                    width: '70vw',
                    // backgroundColor: '#FFDDFF',
                }}
            >
                {events.map((event) => (
                    <Card title={capitalize(event.type)} bordered={false}>
                        <p>{capitalize(event.protocol)}</p>
                        <p>Reputation Points: {event.magnitude}</p>
                    </Card>
                ))}
            </div>

            <div style={{ fontSize: '15px', marginTop: '2vh' }}>Claimed? {claimed ? "👍" : "👎"}</div>
            <Button
                className="button button--secondary"
                onClick={() =>
                    window.location.replace(
                        `https://id.worldcoin.org/use?action_id=${address}&signal=0x0000000000000000000000000000000000000000&return_to=${encodeURIComponent(
                            `${process.env.REACT_APP_CLIENT_URL}worldcoin/${address}`
                        )}`
                    )
                }
            >
                {' '}
                Verify with WorldID{' '}
            </Button>
            <Button
                className="button button--secondary"
                onClick={ 
                    handleRewards
                }
            >
                Claim Rewards
            </Button>

            <br />
        </div>
    );
}


export default Account;
