import React from 'react';
import { Route } from 'react-router-dom';

import 'antd/dist/antd.css';

import {
  LandingPage, FindingPage, 
  AssociationManagePage,
  SignupPage, SigninPage, OAuthSigninCallbackPage,
  ProfilePage, 
  UnionNewPage, UnionDocumentPage, UnionCreatePage, 
  ManageUnionChatPage, ManageUserChatPage, UnionCreateBusinessPage
} from 'pages'

import Navbar from 'components/common/Navbar';

function App() {
	return (
		<>
			<Route component={Navbar} path="/:page" />
			<Route component={LandingPage} path="/" exact />
			<Route component={FindingPage} path="/finding" />
			<Route component={ProfilePage} path="/profile" />
      <Route component={UnionNewPage} path="/union/new" />
			<Route component={AssociationManagePage} path="/union/manage" exact/>
			<Route component={ManageUserChatPage} path="/union/manage/userchat" exact/>
			<Route component={ManageUnionChatPage} path="/union/manage/unionchat" exact/>
			<Route component={UnionCreatePage} path="/union-create/personal" />
      <Route component={UnionCreateBusinessPage} path="/union-create/business" />
			<Route component={SignupPage} path="/signup" />
			<Route component={SigninPage} path="/signin" />
      <Route component={OAuthSigninCallbackPage} path="/users/signin/" />
			<Route component={UnionDocumentPage} path="/union/document" />
		</>
	);
}

export default App;
