import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';

import { Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import UnionCreatePage from './pages/UnionCreatePage';
import AssociationManagePage from './pages/AssociationManagePage';

import Navbar from './components/common/Navbar';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import UnionDocumentPage from 'pages/UnionDocumentPage';

function App() {
	return (
		<>
			<Navbar />
			<Route component={LandingPage} path="/" exact />
			<Route component={HomePage} path="/finding-association" />
			<Route component={ProfilePage} path="/profile" />
			<Route component={AssociationManagePage} path="/association-manage" />
			<Route component={UnionCreatePage} path="/union-create/personal" />
			<Route component={SignupPage} path="/signup" />
			<Route component={SigninPage} path="/signin" />
			<Route component={UnionDocumentPage} path="/union/document" />
		</>
	);
}

export default App;
