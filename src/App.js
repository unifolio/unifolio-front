import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';
import AssociationCreatePage from './pages/AssociationCreatePage';
import AssociationManagePage from './pages/AssociationManagePage';

import Navbar from './components/common/Navbar';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';


function App() {
  return (
    <>
      <Navbar />
      <Route component={ LandingPage } path="/" exact />
      <Route component={ HomePage } path="/finding-association" />
      <Route component={ MyPage } path="/my" />
      <Route component={ AssociationManagePage } path="/association-manage" />
      <Route component={ AssociationCreatePage } path="/association-create" />
      <Route component={ SignupPage } path="/signup" />
      <Route component={ SigninPage } path="/signin" />
    </>
  );
}

export default App;
