import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Button, Tabs, Input, Upload, message, Card, Col, Row } from 'antd';
import Login from './Login.js';
import WhiteBackground from '../components/WhiteBackground.js';
import UserContext from '../UserContext';

function capitalize(str) {
    return str[0].toUpperCase() + str.substring(1);
}

function Form() {
    const { web3 } = useContext(UserContext);

    const walletAddr = web3[0].slice(0, 4) + '...' + web3[0].slice(-4);

    const [name, setName] = useState('Test Name');
    const [toLogin, setToLogin] = useState(false);
    const [reputationScore, setReputationScore] = useState(50);
    const [githubUsername, setGithubUsername] = useState('@TestUsername');
    const [events, setEvents] = useState([]);
    const [ens, setEns] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            console.log('fetching data');
            const compound = await axios.get(`${process.env.REACT_APP_SERVER_URL}api/data/`, {
                params: { address: web3[0], protocol: 'compound' },
            });
            const dydx = await axios.get(`${process.env.REACT_APP_SERVER_URL}api/data/`, {
                params: { address: web3[0], protocol: 'dydx' },
            });

            setEvents([...compound.data.documents, ...dydx.data.documents]);
        };

        const fetchUser = async () => {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}api/user/updateCompoundCredit`, {
                address: web3[0],
            });

            const { data } = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}api/user/getUserData`,
                {
                    params: { address: web3[0] },
                }
            );

            setReputationScore(data.user.score);
            setName(data.user.name);
            setGithubUsername(data.user.github);
            setEns(data.user.ens);
        };

        fetchEvents();
        fetchUser();
    }, [web3]);

    console.log(walletAddr);
    console.log(githubUsername);
    console.log(name);

    const handleSubmit = async () => {
        await axios.put(`${process.env.REACT_APP_SERVER_URL}api/user/saveUserData`, {
            address: web3[0],
            name,
            github: githubUsername,
            ens,
        });
        console.log('posted');
    };

    return (
        <>
            {' '}
            {toLogin === true ? (
                <Login />
            ) : (
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
                                <Input
                                    style={{ borderRadius: '1vw', size: 'small' }}
                                    onChange={(event) => setName(event.target.value)}
                                    value={name}
                                />

                                <div style={{ fontSize: '15px', marginTop: '2vh' }}>
                                    Wallet Address
                                </div>
                                <h3>{walletAddr}</h3>

                                <div style={{ fontSize: '15px', marginTop: '2vh' }}>
                                    GitHub Username
                                </div>
                                <Input
                                    style={{ borderRadius: '1vw', size: 'small' }}
                                    onChange={(event) => setGithubUsername(event.target.value)}
                                    value={githubUsername}
                                />

                                <div style={{ fontSize: '15px', marginTop: '2vh' }}>
                                    Reputation Score
                                </div>
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
                    <div style={{ fontSize: '20px', marginBottom: '2vh', fontWeight: '700' }}>
                        Activity
                    </div>

                    <div
                        className="site-card-wrapper"
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            flexWrap: 'wrap',
                            width: '70vw',
                            backgroundColor: '#FFDDFF',
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
            )}
        </>
    );
}

export default Form;

/**deed name
 * legal name 
 * user comments about the deed
 * coordinates in json format (look into mapping library)
 * [
        [
            1,
            2
        ],
        [
            1,
            3
        ],
        [
            2,
            2
        ],
        [
            2,
            3
        ]
  JSON.stringify(your json)
 */
