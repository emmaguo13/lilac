import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Tabs, Input, Upload, message, Card, Col, Row } from 'antd';
import Login from './Login.js';
import WhiteBackground from '../components/WhiteBackground.js';
import { navigate } from '@reach/router';


import MapPicker from '../components/MapPicker';

const { TextArea } = Input;

function Form() {
  const [deedName, setDeedName] = useState('');
  const [name, setName] = useState('Test Name');
  const [address, setAddress] = useState('');
  const [granteePhone, setGranteePhone] = useState('');
  const [propertyDescription, setPropertyDescription] = useState('');
  const [metamaskAddress, setMetamaskAddress] = useState('0x...');
  const [toLogin, setToLogin] = useState(false);
  const [points, setPoints] = useState([]);
  const [reputationScore, setReputationScore] = useState(50);
  const [githubUsername, setGithubUsername] = useState('@TestUsername');

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
          <div style={{ fontSize: '40px', fontWeight: '700' }}>
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
                <div style={{ fontSize: '15px', marginTop: '2vh' }}>Name</div>
                <Input
                  style={{ borderRadius: '1vw', size: 'small' }}
                  onChange={(event) => setName(event.target.value)}
                  defaultValue={name}
                />

                <div style={{ fontSize: '15px', marginTop: '2vh' }}>Wallet Address</div>
                <h3>{metamaskAddress}</h3>

                <div style={{ fontSize: '15px', marginTop: '2vh' }}>GitHub Username</div>
                <h3>{githubUsername}</h3>

                <div style={{ fontSize: '15px', marginTop: '2vh' }}>Reputation Score</div>
                <h2>{reputationScore}/100</h2>

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


          <div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Propose" bordered={false}>
          <p>Compound</p>
          <p>Reputation Points: 10</p>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Vote" bordered={false}>
        <p>dYdX</p>
          <p>Reputation Points: 1</p>

        </Card>
      </Col>
      <Col span={8}>
        <Card title="Write Article" bordered={false}>
        <p>TribeDAO</p>
          <p>Reputation Points: 12</p>
        </Card>
      </Col>
    </Row>
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
