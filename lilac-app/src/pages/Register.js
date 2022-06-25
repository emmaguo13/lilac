import React, { useState } from 'react';
import { Button, Tabs, Input, Upload, message } from 'antd';
import Login from './Login.js';
import WhiteBackground from '../components/WhiteBackground.js';
import { pollUntilIndexed } from '../tools/poll.js';
import { createProfile } from '../tools/create-profile.js';
import { useAtom } from 'jotai';
import { accessTokenAtom } from '../utils/atom.js';
import { setAuthenticationToken } from '../utils/state';
import { generateChallenge, authenticate } from '../tools/auth.js';
import Web3 from 'web3';

//import { Auth } from '../types';

let web3 = undefined; // Will hold the web3 instance
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// TODO: potentially useeffect for create profile

function Register() {
  const [publicAddress, setPublicAddress] = useState('');
  const [handle, setHandle] = useState('');
  const [toLogin, setToLogin] = useState(false);
  const [accessToken] = useAtom(accessTokenAtom);

  const createLensProfile = async () => {
    console.log("CREATING LENS PROFILE")

    if (!web3) {
      try {
        await window.ethereum.enable();
        web3 = new Web3(window.ethereum);
      } catch (error) {
        window.alert('You need to allow MetaMask.');
        return;
      }
    }

    const challengeResponse = await generateChallenge("0x2a8181c5249Be4729f883C232e395621132c8570");
    const signature = await web3.eth.personal.sign(challengeResponse.data.challenge.text, "0x2a8181c5249Be4729f883C232e395621132c8570");
    const accessTokens = await authenticate("0x2a8181c5249Be4729f883C232e395621132c8570", signature);
    console.log(accessTokens);
    setAuthenticationToken(accessTokens.data.authenticate.accessToken)

    console.log(handle)
    const createProfileResult = await createProfile({
      handle: handle,
    });

    console.log("PROFILE")
    console.log(createProfileResult)

    // STORE THE PROFILE NAME IN MONGO
  
    // console.log('create profile: poll until indexed');
    // const result = await pollUntilIndexed(createProfileResult.data.createProfile.txHash);
  
    // console.log('create profile: profile has been indexed', result);
  
    // const logs = result.txReceipt.logs;
  
    // console.log('create profile: logs', logs);
  
    // const topicId = utils.id(
    //   'ProfileCreated(uint256,address,address,string,string,address,bytes,string,uint256)'
    // );
    // console.log('topicid we care about', topicId);
  
    // const profileCreatedLog = logs.find((l: any) => l.topics[0] === topicId);
    // console.log('profile created log', profileCreatedLog);
  
    // let profileCreatedEventLog = profileCreatedLog.topics;
    // console.log('profile created event logs', profileCreatedEventLog);
  
    // const profileId = utils.defaultAbiCoder.decode(['uint256'], profileCreatedEventLog[1])[0];
  
    // console.log('profile id', BigNumber.from(profileId).toHexString());
  
    // console.log(result.data);
  };
  

  function handleSubmit() {
    console.log("handling submit")
    // Create a Lens Profile
    createLensProfile();

    // Create an instance in our DB
    // fetch(process.env.REACT_APP_SERVER_URL + `/api/auth/users`, {
    //   body: JSON.stringify({
    //     publicAddress: publicAddress,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "POST",
    // }).then((response) => response.json());
    setToLogin(true);
  }

  return (
    <>
      {' '}
      {toLogin === true ? (
        <Login />
      ) : (
        <div
          style={{
            width: '100vw',
            height: '100vh',
            position: 'absolute',
            margin: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            zIndex: '0',
          }}
        >
          <WhiteBackground />
          <div
            style={{
              position: 'absolute',
              zIndex: '1',
              marginBottom: '390px',
            }}
          >
            <h1 style={{ fontWeight: '700', fontSize: '60px' }}>Register</h1>
          </div>

          <div
            style={{
              position: 'absolute',
              zIndex: '1',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: 'column',
              }}
            >
              <div style={{ fontSize: '15px', marginTop: '2vh' }}>Lens Profile Name</div>
              <Input
                style={{ borderRadius: '1vw' }}
                onChange={(event) => setHandle(event.target.value)}
              />

              <div style={{ fontSize: '15px', marginTop: '2vh' }}>Public Address</div>
              <Input
                style={{ borderRadius: '1vw' }}
                onChange={(event) => setPublicAddress(event.target.value)}
              />

              <Button
                variant="primary"
                type="submit"
                onClick={handleSubmit}
                className="button button--secondary"
                style={{
                  marginTop: '10%',
                }}
              >
                REGISTER
              </Button>
            </div>
          </div>
        </div>
      )}{' '}
    </>
  );
}

export default Register;
