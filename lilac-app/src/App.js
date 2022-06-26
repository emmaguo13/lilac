import { React, useState } from 'react';
import { Router } from '@reach/router';
import Home from './pages/Home.js';
import WorldcoinConfirmation from './pages/WorldcoinConfirmation.js';
import Register from './pages/Register.js';
import Account from './pages/Account.js';
import NavBar from './components/NavBar.js';
import UserContext from './UserContext';
import Search from './pages/Search.js';
import Login from './pages/Login.js';

import './App.less';
import './App.scss';

function App() {
    const [web3, setWeb3] = useState('');

    return (
        <UserContext.Provider
            value={{
                web3,
                setWeb3,
            }}
        >
            <NavBar></NavBar>
            <Router>
                <Home path="/" />
                <WorldcoinConfirmation path="/worldcoin/:params" />
                <Login path="/login" />
                <Register path="/register/:address" />
                <Account path="/account/:address" />
                <Search path="/search" />
            </Router>
        </UserContext.Provider>
    );
}

export default App;
