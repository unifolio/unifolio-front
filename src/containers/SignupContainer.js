import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import {
  addIDPW,
  addPersonalInfo,
  addCorporationInfo,
  addPhone,
  addAgreement,
  getSignupStateThunk,
} from 'modules/reducers/signup';

import Card from 'composition/Signup/Card';
import Header from 'composition/Signup/Header';
import ProcessIndicator from 'composition/Signup/ProcessIndicator';
import * as SignupPersonal from 'composition/Signup/PersonalPhase';
import * as SignupCorporation from 'composition/Signup/CorporationPhase';
import Conditional from 'components/common/Conditional';
import API from '../lib/api';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

const SignupContainer = ({ history }) => {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState('default');
  const [process, setProcess] = useState(0);

  const signupInputData = useSelector((state) => state.signup);

  useEffect(() => {
    console.log('signupInputData', signupInputData);
  }, [process]);

  const handleChangeCurrent = (value) => {
    setCurrent(value);
    setProcess(1);
  };
  const personalSignupBack = (process) => () => {
    setProcess(process);
  };
  const render = () => {
    if (current === 'general') {
      switch (process) {
        case 1:
          return <SignupPersonal._01 onClickNext={handleClickNext} />;
        case 2:
          return (
            <SignupPersonal._02
              onClickNext={handleClickNext}
              onClickBack={personalSignupBack(1)}
            />
          );
        case 3:
          return (
            <SignupPersonal._03
              onClickNext={handleClickNext}
              onClickBack={personalSignupBack(2)}
            />
          );
        case 4:
          return (
            <SignupPersonal._04
              onClickNext={handleClickNext}
              onClickBack={personalSignupBack(3)}
            />
          );
        default:
          return <></>;
      }
    } else if (current === 'business') {
      switch (process) {
        case 1:
          return (
            <SignupCorporation._01
              signupInputData={signupInputData}
              onClickNext={handleClickNext}
            />
          );
        case 2:
          return (
            <SignupCorporation._02
              signupInputData={signupInputData}
              onClickNext={handleClickNext}
              onClickBack={handleClickBack}
            />
          );
        case 3:
          return (
            <SignupCorporation._03
              signupInputData={signupInputData}
              onClickNext={handleClickNext}
              onClickBack={handleClickBack}
            />
          );
        default:
          return <></>;
      }
    }
  };

  const handleClickNext = async (formData, process) => {
    if (current === 'general') {
      switch (process) {
        case 1:
          dispatch(addIDPW(formData));
          break;
        case 2:
          dispatch(addPersonalInfo(formData));
          break;
        case 3:
          dispatch(addPhone(formData));
          break;
        case 4:
          dispatch(addAgreement({ ...formData, role: current }));
          const data = dispatch(getSignupStateThunk());
          const response = await API.post.userSignupGeneral(data);

          if (response.data.status === 201) {
            alert('회원가입이 완료되었습니다');
            history.push('/signin');
          } else {
            alert('오류가 발생하였습니다.');
            // alert("오류가 발생했지만 회원가입은 진행되었을 것입니다.. 210912 기준 SMTPSender Refused 에러 개발자 도구를 확인해주세요");
            console.error(response.data);
            // window.location.href= "/signin";
          }
          break;
        default:
          console.log('onClickNext error');
      }
    } else if (current === 'business') {
      switch (process) {
        case 1:
          dispatch(addIDPW(formData));
          break;
        case 2:
          dispatch(addCorporationInfo(formData));
          break;
        case 3:
          dispatch(addAgreement({ ...formData, role: current }));
          const data = dispatch(getSignupStateThunk());
          const response = await API.post.userSignupBusiness(data);

          if (response.data.status === 201) {
            alert('회원가입이 완료되었습니다');
            history.push('/signin');
          } else {
            alert('오류가 발생했습니다.');
          }
          break;
        default:
          console.log('onClickNext error');
      }
    }
    setProcess(process + 1); // 회원가입 프로세스 값 갱신
  };

  const handleClickBack = (process) => {
    if (current === 'business') {
      setProcess(process);
    }
  };

  return (
    <>
      <Header current={current} process={process} />
      <Conditional condition={current === 'default'}>
        <CardArea>
          <Card type={'general'} onChangeCurrent={handleChangeCurrent} />
          <Card type={'business'} onChangeCurrent={handleChangeCurrent} />
        </CardArea>
      </Conditional>
      <Conditional condition={current !== 'default'}>
        <ProcessIndicator current={current} process={process} />
      </Conditional>
      <SignupBlock>{render()}</SignupBlock>
    </>
  );
};

const CardArea = styled.div`
  margin-top: 80px;
  font-size: var(--fontSize18);

  display: flex;
`;

const SignupBlock = styled.div`
  width: 100%;

  .deactivate {
    display: none;
  }
`;

export default withRouter(SignupContainer);
