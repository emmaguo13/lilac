import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'antd';
import Web3 from 'web3';
import LoginBack from '../components/LoginBack.js';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { navigate } from '@reach/router';
import UserContext from '../UserContext';

// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function Login(props) {
    const { web3, setWeb3 } = useContext(UserContext);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (web3[0]) {
            navigate(`/account/${web3[0]}`);
        }
    }, [web3]);

    async function handleMetamaskLogin() {
        console.log('handling login');
        // Check if MetaMask is installed
        if (!window.ethereum) {
            // what is window
            console.log('checking for metamask');
            window.alert('Please install MetaMask first.');
            return;
        }
        var web = undefined;
            try {
                // Request account access if needed
                await window.ethereum.enable();

                // We don't know window.web3 version, so we use our own instance of Web3
                // with the injected provider given by MetaMask
                web = new Web3(window.ethereum);
                web.eth.getAccounts().then(async (addr) => {
                    // Set User account into state
                    setWeb3(addr);
                });
            } catch (error) {
                console.log(error);
                window.alert('You need to allow MetaMask.');
                return;
            }
        const coinbase = await web.eth.getCoinbase();
        if (!coinbase) {
            window.alert('Please activate MetaMask first.');
            return;
        }

        const publicAddress = coinbase.toLowerCase();
        console.log(publicAddress);
        setLoading(true);
        console.log(process.env.REACT_APP_SERVER_URL);
        // idk wtf is going on
    }

    async function handleWCLogin() {
        console.log('handling WalletConnect login');
        const provider = new WalletConnectProvider({
            infuraId: '2d00259a58f9421fbba51c39bfa30d7c',
        });

        await provider.enable();
        return new Web3(provider);
    }

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    zIndex: '0',
                }}
            >
                <LoginBack />
            </div>

            <div
                className="LogIn"
                style={{
                    display: 'flex',
                    zIndex: '1',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    marginTop: '15vh',
                }}
            >
                <h1
                    style={{
                        fontWeight: '700',
                    }}
                >
                    Connect your wallet.
                </h1>

                <Button
                    className="button button--secondary"
                    variant="primary"
                    type="submit"
                    onClick={handleMetamaskLogin}
                    style={{
                        marginTop: '3vh',
                    }}
                >
                    Connect with Metamask
                </Button>
                <Button
                    className="button button--secondary"
                    variant="primary"
                    type="submit"
                    onClick={handleWCLogin}
                    style={{
                        marginTop: '3vh',
                    }}
                >
                    Connect with WalletConnect
                </Button>
            </div>
        </div>
    );
}

export default Login;
