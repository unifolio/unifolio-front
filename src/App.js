import React from 'react';

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
import ManageUnionChatPage from 'pages/ManageUnionChatPage';
import ManageUserChatPage from 'pages/ManageUserChatPage';

function App() {
	return (
		<>
			<Navbar />
			<Route component={LandingPage} path="/" exact />
			<Route component={HomePage} path="/finding" />
			<Route component={ProfilePage} path="/profile" />
			<Route component={AssociationManagePage} path="/union/manage" exact/>
			<Route component={ManageUserChatPage} path="/union/manage/userchat" exact/>
			<Route component={ManageUnionChatPage} path="/union/manage/unionchat" exact/>
			<Route component={UnionCreatePage} path="/union-create/personal" />
			<Route component={SignupPage} path="/signup" />
			<Route component={SigninPage} path="/signin" />
			<Route component={UnionDocumentPage} path="/union/document" />
		</>
	);
}

export default App;
