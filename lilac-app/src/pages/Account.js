import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login.js';
import WhiteBackground from '../components/WhiteBackground.js';
import { navigate } from '@reach/router';

//imports that are breaking
import { ChakraProvider } from '@chakra-ui/react';
import Cover from '../components/Cover';
import Main from '../components/Main';

// export default function App() {
//   return (
//     <SimpleBar style={{ maxHeight: '100vh' }}>
//       <ChakraProvider>
//         <Router>
//           <Switch>
//             <Route path="/" exact>
//               <Cover />
//               <Main />
//             </Route>
//           </Switch>
//         </Router>
//       </ChakraProvider>
//     </SimpleBar>
//   )
// }

function Form() {
  const [deedName, setDeedName] = useState('');
  const [granteeName, setGranteeName] = useState('');
  const [address, setAddress] = useState('');
  const [granteePhone, setGranteePhone] = useState('');
  const [propertyDescription, setPropertyDescription] = useState('');
  const [metamaskAddress, setMetamaskAddress] = useState('');
  const [toLogin, setToLogin] = useState(false);
  const [points, setPoints] = useState([]);
  const [reputationScore, setReputationScore] = useState(50);
  const [githubUsername, setGithubUsername] = useState('@TestUsername');

  function handleSubmit() {
    console.log('beans');
  }

  return (
    <>
      {' '}
      {toLogin === true ? (
        <Login />
      ) : (
        <div className="form">
          <div style={{ fontSize: '40px', marginBottom: '2vh', fontWeight: '700' }}>My Profile</div>
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
                <input
                  style={{ borderRadius: '1vw', size: 'small' }}
                  onChange={(event) => setDeedName(event.target.value)}
                />

                <div style={{ fontSize: '15px', marginTop: '2vh' }}>Wallet Address</div>
                <input
                  style={{ borderRadius: '1vw', size: 'small' }}
                  onChange={(event) => setGranteeName(event.target.value)}
                  multiple
                />

                <div style={{ fontSize: '15px', marginTop: '2vh' }}>GitHub Username</div>
                <h3>{githubUsername}</h3>

                <div style={{ fontSize: '15px', marginTop: '2vh' }}>Reputation Score</div>
                <h2>{reputationScore}/100</h2>
              </div>
            </div>
          </div>

          <br />
          <button
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            className="button button--secondary"
          >
            SAVE
          </button>
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
