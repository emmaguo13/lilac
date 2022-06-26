import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Button, Tabs, Input, Upload, message, Card, Col, Row } from 'antd';
import WhiteBackground from '../components/WhiteBackground.js';
import UserContext from '../UserContext';

function capitalize(str) {
    return str[0].toUpperCase() + str.substring(1);
}

function Account({ address }) {
    const { web3 } = useContext(UserContext);

    console.log('rendering account');

    const walletAddr = address.slice(0, 6) + '...' + address.slice(-5, -1);

    const [name, setName] = useState('Test Name');
    const [reputationScore, setReputationScore] = useState(50);
    const [githubUsername, setGithubUsername] = useState('@TestUsername');
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            console.log('fetching data');
            const compound = await axios.get(`${process.env.REACT_APP_SERVER_URL}api/data/`, {
                params: { address, protocol: 'compound' },
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
        };

        fetchEvents();
        fetchUser();
    }, [address]);

    console.log(walletAddr);

    const handleSubmit = async () => {
        await axios.put(`${process.env.REACT_APP_SERVER_URL}api/user/saveUserData`, {
            address,
            github: githubUsername,
            name,
        });
        console.log('updated');
    };

    return (
        <div className="form">
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
                            marginTop: '20vh',
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
            <div style={{ fontSize: '20px', marginBottom: '2vh', fontWeight: '700' }}>Activity</div>

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
            <br />
        </div>
    );
}

export default Account;
