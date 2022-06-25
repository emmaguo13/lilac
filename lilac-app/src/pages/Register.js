import React, { useState } from 'react';
import Login from './Login.js';
import WhiteBackground from '../components/WhiteBackground.js';

//import { Auth } from '../types';

let web3 = undefined; // Will hold the web3 instance
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [metamaskAddress, setMetamaskAddress] = useState('');
  const [toLogin, setToLogin] = useState(false);
  const [role, setRole] = useState('');
  const [typing1, setTyping1] = useState('');
  const [typing2, setTyping2] = useState('');
  const [typing3, setTyping3] = useState('');

  function handleSubmit() {
    setToLogin(true);
    console.log('hi');
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
              <div style={{ fontSize: '15px', marginTop: '2vh' }}>Full Name</div>

              <div style={{ fontSize: '15px', marginTop: '2vh' }}>Role</div>

              <div style={{ fontSize: '15px', marginTop: '2vh' }}>Metamask Address</div>
              <input
                style={{ borderRadius: '1vw' }}
                onChange={(event) => setMetamaskAddress(event.target.value)}
              />

              <div style={{ fontSize: '15px', marginTop: '2vh' }}>Email</div>

              <button
                variant="primary"
                type="submit"
                onClick={handleSubmit}
                className="button button--secondary"
                style={{
                  marginTop: '10%',
                }}
              >
                REGISTER
              </button>
            </div>
          </div>
        </div>
      )}{' '}
    </>
  );
}

export default Register;
