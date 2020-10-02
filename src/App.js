import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';

import Navbar from './components/common/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Route component={ LandingPage } path="/" exact />
      <Route component={ HomePage } path="/home" />
    </>
  );
}

export default App;
