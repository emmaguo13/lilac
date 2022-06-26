import React, { useState, useEffect, useContext } from 'react';
import { Button, Link, Input } from 'antd';
import Web3 from 'web3';
import axios from 'axios';
import Register from './Register.js';
import LoginBack from '../components/LoginBack.js';
import WalletConnectProvider from '@walletconnect/web3-provider';
import UserContext from '../UserContext';
import Account from './Account.js';
import { generateChallenge, authenticate } from '../tools/auth.js';

function Login(props) {
  const { web3, setWeb3 } = useContext(UserContext);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [goToReg, setGoToReg] = useState(false);
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    setAuthState(false);
}, []);

  function handleLoggedIn(auth) {
    console.log('handleLoggedIn');
    setAuthState({ auth });
  }

  function handleAuthenticate(publicAddress, signature) {
    console.log('Handling auth');
    if (goToReg) {
      console.log('going to registration');
    } else {
    }
  }

  async function handleWCLogin() {
    console.log('handling WalletConnect login');
    const provider = new WalletConnectProvider({
        infuraId: '2d00259a58f9421fbba51c39bfa30d7c',
    });

    await provider.enable();
    return new Web3(provider);
}

  async function handleLogin() {
    if (!window.ethereum) {
      window.alert('Please install MetaMask first.');
      return;
    }
    if (!web3) {
      try {
        await window.ethereum.enable();
        web3 = new Web3(window.ethereum);
      } catch (error) {
        window.alert('You need to allow MetaMask.');
        return;
      }
    }
    const coinbase = await web3.eth.getCoinbase();
    if (!coinbase) {
      window.alert('Please activate MetaMask first.');
      return;
    }
    /* get address and tokens */
    const publicAddress = coinbase.toLowerCase();
    console.log(publicAddress);
    const challengeResponse = await generateChallenge(publicAddress);
    const signature = await web3.eth.personal.sign(challengeResponse.data.challenge.text, publicAddress);
    const accessTokens = await authenticate(publicAddress, signature);
    console.log(accessTokens);

    // PROBABLY WANT TO STORE ACCESS TOKENS TO BACKEND

    setLoading(true);
    console.log(process.env.REACT_APP_SERVER_URL);
    const { data } = await axios.get(
      process.env.REACT_APP_SERVER_URL + `ENDPOINT=${publicAddress}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!data.user[0]) {
      setGoToReg(true);
    } else {
      const message = await handleSignMessage(data.user[0].publicAddress, data.user[0].nonce);
      if (message != null) {
        await handleAuthenticate(message.publicAddress, message.signature);
        try {
          //console.log(onLoggedIn)
          await handleLoggedIn(authState);
          //console.log(data.user[0])
        } catch (err) {
          await setLoading(false);
          console.log(err);
        }
      }
    }
  }

  async function handleSignMessage(publicAddress, nonce) {
    console.log(goToReg);
    console.log(publicAddress);
    console.log(nonce);
    if (goToReg || !publicAddress || !nonce) {
      console.log('going to registration');
    } else {
      try {
        console.log(publicAddress);
        console.log(nonce);
        const signature = await web3.eth.personal.sign(
          `I am signing my one-time nonce: ${nonce}`,
          publicAddress,
          '' // MetaMask will ignore the password argument here
        );
        console.log(publicAddress);
        console.log(signature);
        return { publicAddress, signature };
      } catch (err) {
        console.log(err);
      }
    }
  }

  function handleSignUp(publicAddress) {
    return fetch(process.env.REACT_APP_SERVER_URL +`ENDPOINT`, {
        body: JSON.stringify({ publicAddress }),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    }).then((response) => response.json());
  }
  return (
    <>
      {goToReg === true ? (
        <Register />
      ) : authState ? (
          <Account />
      ) : (
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
          </div>
        </div>
      )}{' '}
    </>
  );
}

export default Login;