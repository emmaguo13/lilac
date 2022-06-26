import React, { useState, useContext } from 'react';
import { Button, Tabs, Input, Upload, message } from 'antd';
import Login from './Login.js';
import WhiteBackground from '../components/WhiteBackground.js';
// import { pollUntilIndexed } from '../tools/poll.js';
import UserContext from '../UserContext';

import { createProfile } from '../tools/create-profile.js';
import { navigate } from '@reach/router';
import axios from 'axios';

function Register({ address }) {
    const [publicAddress, setPublicAddress] = useState('');
    const [handle, setHandle] = useState('');
    const { web3, setWeb3 } = useContext(UserContext);

    const createLensProfile = async () => {
        console.log('CREATING LENS PROFILE');
        console.log(handle);
        const createProfileResult = await createProfile({
            handle: handle,
        });

        console.log('PROFILE');
        console.log(createProfileResult);

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

    const handleSubmit = async () => {
        console.log('handling submit');
        // Create a Lens Profile
        createLensProfile();

        // Create an instance in our DB
        await axios.put(process.env.REACT_APP_SERVER_URL + `api/user/saveUserData`, {
            address,
            name: handle,
        });
        setWeb3(address);

        navigate(`/account/${address}`);
    };

    return (
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
    );
}

export default Register;
