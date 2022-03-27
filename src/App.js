import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
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
  UnionParticipateListPage,
} from 'pages';

import Navbar from 'components/common/Navbar';
import { isMobile } from 'react-device-detect';

function App() {
  return (
    <>
      {isMobile && (
        <MobileProtect>
          본 서비스는 데스크탑 환경에 최적화 되어 있습니다.
        </MobileProtect>
      )}

      <Route component={Navbar} path={['/', '/:page']} />
      <Route component={LandingPage} path='/' exact />
      <Route component={FindingPage} path='/finding' />
      <Route component={ProfilePage} path='/profile' />
      <Route component={UnionNewPage} path='/union/new' />

      <Route
        component={UnionManageListPage}
        path='/union/my-unions-manage'
        exact
      />
      <Route
        component={UnionParticipateListPage}
        path='/union/my-participate-unions'
      />
      <Route component={UnionManagePage} path='/union/manage/:id' exact />
      <Route
        component={UnionParticipatePage}
        path='/union/participate/:id'
        exact
      />

      <Route
        component={UnionManageChatPage}
        path='/union/manage/:unionId/userchat/:receiverId'
      />
      <Route component={UnionCreatePage} path='/union-create/personal' />
      <Route
        component={UnionCreateBusinessPage}
        path='/union-create/business'
      />
      <Route component={SignupPage} path='/signup' />
      <Route component={SigninPage} path='/signin' />
      <Route component={OAuthSigninCallbackPage} path='/users/signin/' />
      <Route component={UnionDocumentPage} path='/union/document' />
      <Route component={UsersVerifyPage} path='/users/verify' />
    </>
  );
}

export default App;

const MobileProtect = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 99;
  background-color: #49458b;
  color: #fff;
  font-weight: 500;
  font-size: 24px;
  line-height: 40px;
  word-break: keep-all;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 40px;
  text-align: center;
`;
