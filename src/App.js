import React from "react";
import { Route } from "react-router-dom";

import {
  LandingPage,
  FindingPage,
  UnionManagePage,
  SignupPage,
  SigninPage,
  OAuthSigninCallbackPage,
  ProfilePage,
  UnionNewPage,
  UnionDocumentPage,
  UnionCreatePage,
  UnionManageListPage,
  UnionManageChatPage,
  UnionCreateBusinessPage,
  UsersVerifyPage,
  UnionParticipatePage,
  UnionParticipateListPage
} from "pages";

import Navbar from "components/common/Navbar";

function App() {
  return (
    <>
      <Route component={Navbar} path={["/", "/:page"]} />
      <Route component={LandingPage} path="/" exact />
      <Route component={FindingPage} path="/finding" />
      <Route component={ProfilePage} path="/profile" />
      <Route component={UnionNewPage} path="/union/new" />

      <Route component={UnionManageListPage} path="/union/my-unions-manage" exact />
      <Route component={UnionParticipateListPage} path="/union/my-participate-unions" />
      <Route component={UnionManagePage} path="/union/manage/:id" exact />
      <Route
        component={UnionParticipatePage}
        path="/union/participate/:id"
        exact
      />
      
      <Route component={UnionManageChatPage} path="/union/manage/:unionId/userchat/:receiverId" />
      <Route component={UnionCreatePage} path="/union-create/personal" />
      <Route
        component={UnionCreateBusinessPage}
        path="/union-create/business"
      />
      <Route component={SignupPage} path="/signup" />
      <Route component={SigninPage} path="/signin" />
      <Route component={OAuthSigninCallbackPage} path="/users/signin/" />
      <Route component={UnionDocumentPage} path="/union/document" />
      <Route component={UsersVerifyPage} path="/users/verify" />
    </>
  );
}

export default App;
