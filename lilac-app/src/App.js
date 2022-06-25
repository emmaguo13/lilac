import React from 'react';
import { Router } from '@reach/router';
import UserStatus from './pages/UserStatus.js';
import Home from './pages/Home.js';
import LoginController from './pages/LoginController.js';
import Register from './pages/Register.js';
import Form from './pages/Account.js';
import NavBar from './components/NavBar.js';
import { ChakraProvider } from '@chakra-ui/react';

const App = () => (
  <ChakraProvider>
    <NavBar></NavBar>
    <Router>
      <Home path="/" />
      <LoginController path="/login" />
      <Register path="/register" />
      <Form path="form" />
      <UserStatus path="user-status" />
    </Router>
  </ChakraProvider>
);

export default App;
