import React from 'react';
import { Router } from '@reach/router';
import UserStatus from './pages/UserStatus.js';
import ApproveRequests from './pages/notary/ApproveRequests.js';
import Home from './pages/Home.js';
import LoginController from './pages/LoginController.js';
import Register from './pages/Register.js';
import Form from './pages/Form.js';
import Deed from './pages/Deed.js';
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
      <ApproveRequests path="approve-requests" />
      <Deed path="/deed/:id" />
    </Router>
  </div>
);

export default App;
