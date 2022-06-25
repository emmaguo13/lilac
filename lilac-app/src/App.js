import { React, useState } from 'react';
import { Router } from '@reach/router';
import UserStatus from './pages/UserStatus.js';
import Home from './pages/Home.js';
import LoginController from './pages/LoginController.js';
import Register from './pages/Register.js';
import Form from './pages/Account.js';
import NavBar from './components/NavBar.js';
import UserContext from "./UserContext";


import './App.less';
import './App.scss';

function App() {
  const [web3, setWeb3] = useState('')

  return (
    <UserContext.Provider value={{
      web3,
      setWeb3
    }}>
  <div>
    <NavBar></NavBar>
    <Router>
      <Home path="/" />
      <LoginController path="/login" />
      <Register path="/register" />
      <Form path="form" />
      <UserStatus path="user-status" />
    </Router>
  </div>
  </UserContext.Provider>
  );
}

export default App;
