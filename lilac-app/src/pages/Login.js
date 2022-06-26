import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'antd';
import Web3 from 'web3';
import LoginBack from '../components/LoginBack.js';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { navigate } from '@reach/router';
import UserContext from '../UserContext';
import Account from './Account.js';
import { generateChallenge, authenticate } from '../tools/auth.js';
import axios from 'axios';
import { setAuthenticationToken } from '../utils/state.js';

function Login(props) {
    const { web3, setWeb3 } = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (web3[0]) {
            navigate(`/account/${web3[0]}`);
        }
    }, [web3]);

    async function handleWCLogin() {
        let web3Instance = {};
        let accounts = [];
        console.log('handling WalletConnect login');
        const provider = new WalletConnectProvider({
            infuraId: '2d00259a58f9421fbba51c39bfa30d7c',
        });

        await provider.enable();
        web3Instance = new Web3(provider);
        console.log("connected walletconnect");
        
        
        // Subscribe to session disconnection
        // provider.on("disconnect", (code, reason) => {
        // console.log(code, reason);
        // });

        try {
            accounts = await web3Instance.eth.getAccounts();
            console.log("got accounts");
            console.log(accounts[0]);
            console.log(accounts[1]);
        } catch (error) {
            window.alert('You need to allow WalletConnect.');
            return;
        }

        const challengeResponse = await generateChallenge(accounts[0]);
        const signature = await web3Instance.eth.personal.sign(
            challengeResponse.data.challenge.text,
            accounts[0]
        );
        console.log("signature received");
        console.log(signature);

        console.log("access tokens");
        const accessTokens = await authenticate(accounts[0], signature);
        console.log(accessTokens);
        setAuthenticationToken(accessTokens.data.authenticate.accessToken);

        setLoading(true);
        // console.log(process.env.REACT_APP_SERVER_URL);
        const { data } = await axios.get(
            process.env.REACT_APP_SERVER_URL + 'api/user/getUserData',
            {
                headers: { 'Content-Type': 'application/json' },
                params: { address: accounts[0] },
            }
        );
        console.log(data);
        if (!data.user) {
            navigate(`/register/${accounts[0]}`);
        } else {
            // const message = await handleSignMessage(data.user[0].address, data.user[0].nonce);
            // if (message != null) {
            try {
                //console.log(onLoggedIn)
                setWeb3(accounts);
                //console.log(data.user[0])
            } catch (err) {
                await setLoading(false);
                console.log(err);
            }
            // }
        }
    }

    async function handleLogin() {
        let web3Instance = {};
        let accounts = [];
        if (!window.ethereum) {
            window.alert('Please install MetaMask first.');
            return;
        }
        if (!web3) {
            try {
                await window.ethereum.enable();
                // go
                web3Instance = new Web3(window.ethereum);
                accounts = await web3Instance.eth.getAccounts();
            } catch (error) {
                window.alert('You need to allow MetaMask.');
                return;
            }
        }
        // const coinbase = await web3.eth.getCoinbase();
        // if (!coinbase) {
        //     window.alert('Please activate MetaMask first.');
        //     return;
        // }
        // /* get address and tokens */
        // const publicAddress = coinbase.toLowerCase();
        // console.log(publicAddress);
        const challengeResponse = await generateChallenge(accounts[0]);
        const signature = await web3Instance.eth.personal.sign(
            challengeResponse.data.challenge.text,
            accounts[0]
        );

        const accessTokens = await authenticate(accounts[0], signature);
        console.log(accessTokens);
        setAuthenticationToken(accessTokens.data.authenticate.accessToken);

        setLoading(true);
        // console.log(process.env.REACT_APP_SERVER_URL);
        const { data } = await axios.get(
            process.env.REACT_APP_SERVER_URL + 'api/user/getUserData',
            {
                headers: { 'Content-Type': 'application/json' },
                params: { address: accounts[0] },
            }
        );
        console.log(data);
        if (!data.user) {
            navigate(`/register/${accounts[0]}`);
        } else {
            // const message = await handleSignMessage(data.user[0].address, data.user[0].nonce);
            // if (message != null) {
            try {
                //console.log(onLoggedIn)
                setWeb3(accounts);
                //console.log(data.user[0])
            } catch (err) {
                await setLoading(false);
                console.log(err);
            }
            // }
        }
    }

    // async function handleSignMessage(publicAddress, nonce) {
    //     console.log(publicAddress);
    //     console.log(nonce);
    //     if (!publicAddress || !nonce) {
    //         console.log('going to registration');
    //     } else {
    //         try {
    //             console.log(publicAddress);
    //             console.log(nonce);
    //             const signature = await web3.eth.personal.sign(
    //                 `I am signing my one-time nonce: ${nonce}`,
    //                 publicAddress,
    //                 '' // MetaMask will ignore the password argument here
    //             );
    //             console.log(publicAddress);
    //             console.log(signature);
    //             return { publicAddress, signature };
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    // }

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
                    Sign in with Metamask
                </h1>

                <Button
                    className="button button--secondary"
                    variant="primary"
                    type="submit"
                    onClick={handleLogin}
                >
                    Continue
                </Button>
                <Button
                    className="button button--secondary"
                    variant="primary"
                    type="submit"
                    onClick={handleWCLogin}
                >
                    WalletConnect
                </Button>
            </div>
        </div>
    );
}

export default Login;
