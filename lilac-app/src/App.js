import React from 'react';
import { Router } from '@reach/router';
import UserStatus from './pages/UserStatus.js';
import Home from './pages/Home.js';
import LoginController from './pages/LoginController.js';
import Register from './pages/Register.js';
import Form from './pages/Form.js';
import NavBar from './components/NavBar.js';

import './App.less';
import './App.scss';

const App = () => (
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
);

export default App;
