import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Tabs, Input, Upload, message } from 'antd';
import Login from './Login.js';
import WhiteBackground from '../components/WhiteBackground.js';
import { navigate } from '@reach/router';

import MapPicker from '../components/MapPicker';

const { TextArea } = Input;

function Form() {
  const [deedName, setDeedName] = useState('');
  const [granteeName, setGranteeName] = useState('');
  const [address, setAddress] = useState('');
  const [granteePhone, setGranteePhone] = useState('');
  const [propertyDescription, setPropertyDescription] = useState('');
  const [metamaskAddress, setMetamaskAddress] = useState('');
  const [toLogin, setToLogin] = useState(false);
  const [points, setPoints] = useState([]);

  function handleSubmit() {
    console.log("beans")
  }

  return (
    <>
      {' '}
      {toLogin === true ? (
        <Login />
      ) : (
        <div className="form">
          <div style={{ fontSize: '40px', marginBottom: '2vh', fontWeight: '700' }}>
            My Profile
          </div>
          <div className="contents-align">
            <div className="form-display">
              <div
                style={{
                  position: 'absolute',
                  zIndex: '-1',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  
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
                  width: '30vw',
                  height: '100%',
                  padding: '0 5vw 0 5vw',
                  marginTop: '20vh',
                }}
              >
                <div style={{ fontSize: '15px', marginTop: '2vh' }}>Deed Name</div>
                <Input
                  style={{ borderRadius: '1vw', size: 'small' }}
                  onChange={(event) => setDeedName(event.target.value)}
                />

                <div style={{ fontSize: '15px', marginTop: '2vh' }}>Grantee Full name</div>
                <Input
                  style={{ borderRadius: '1vw', size: 'small' }}
                  onChange={(event) => setGranteeName(event.target.value)}
                  multiple
                />

                <div style={{ fontSize: '15px', marginTop: '2vh' }}>Grantee Mailing Address</div>
                <Input
                  style={{ borderRadius: '1vw', size: 'small' }}
                  onChange={(event) => setGranteePhone(event.target.value)}
                />

                <div style={{ fontSize: '15px', marginTop: '2vh' }}>Metamask Address</div>
                <Input
                  style={{ borderRadius: '1vw', size: 'small' }}
                  onChange={(event) => setAddress(event.target.value)}
                />

                <div style={{ fontSize: '15px', marginTop: '2vh' }}>Property Description</div>
                <TextArea
                  style={{ borderRadius: '1vw', size: 'small' }}
                  onChange={(event) => setPropertyDescription(event.target.value)}
                />
              </div>
            </div>
          </div>

          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            className="button button--secondary"
          >
            APPLY
          </Button>
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
