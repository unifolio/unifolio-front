import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';
import AssociationCreatePage from './pages/AssociationCreatePage';

import Navbar from './components/common/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Route component={ LandingPage } path="/" exact />
      <Route component={ HomePage } path="/home" />
      <Route component={ MyPage } path="/my" />
      <Route component={ AssociationCreatePage } path="/association-create" />
    </>
  );
}

export default App;
