import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { addIDPW, addPersonalInfo, addCorporationInfo, addPhone, addAgreement, getSignupStateThunk } from 'modules/reducers/signup';

import Card from 'composition/Signup/Card';
import Header from 'composition/Signup/Header';
import ProcessIndicator from 'composition/Signup/ProcessIndicator';
import * as SignupPersonal from 'composition/Signup/PersonalPhase';
import * as SignupCorporation from 'composition/Signup/CorporationPhase';

import API from '../lib/api';

const SignupContainer = () => {
	const dispatch = useDispatch();
  const [current, setCurrent] = useState("default");
  const [process, setProcess] = useState(0);

  const handleChangeCurrent = (value) => {
    setCurrent(value);
    setProcess(1);
  }

  const render = () => {
    
    if (current === "general") {
      switch (process) {
        case 1:
          return <SignupPersonal._01 onClickNext={handleClickNext} />
        case 2:
          return <SignupPersonal._02 onClickNext={handleClickNext} />
        case 3:
          return <SignupPersonal._03 onClickNext={handleClickNext} />
        case 4:
          return <SignupPersonal._04 onClickNext={handleClickNext} />
        default:
          return <></>
      }
    } else if (current === "business") {
      switch (process) {
        case 1:
          return <SignupCorporation._01 onClickNext={handleClickNext} />
        case 2:
          return <SignupCorporation._02 onClickNext={handleClickNext} />
        case 3:
          return <SignupCorporation._03 onClickNext={handleClickNext} />
        default:
          return <></>
      }
    }
  }

	const handleClickNext = async (formData, process) => {
    if (current === "general") {
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
          dispatch(addAgreement({...formData, role: current}));
          const data = dispatch(getSignupStateThunk());
          const response = await API.post.userSignupGeneral(data);
          
          if (response.status === 200) {
            alert('회원가입이 완료되었습니다');
            window.location.href = '/signin';
          } else {
            alert("오류가 발생했습니다.");
          }
          break;
        default:
          console.log('onClickNext error');
      }
    }
    else if (current === "business") {
      switch (process) {
        case 1:
          dispatch(addIDPW(formData));
          break;
        case 2:
          dispatch(addCorporationInfo(formData));
          break;
        case 3:
          dispatch(addAgreement({...formData, role: current}));
          const data = dispatch(getSignupStateThunk());
          const response = await API.post.userSignupBusiness(data);
          
          if (response.status === 200) {
            alert('회원가입이 완료되었습니다');
            window.location.href = '/signin';
          } else {
            alert("오류가 발생했습니다.");
          }
          break;
        default:
          console.log('onClickNext error');
      }
    }
    setProcess(process+1); // 회원가입 프로세스 값 갱신
	};
	return (
    <>
      <Header current={current} process={process} />
      {current === "default" 
        ? <CardArea>
            <Card type={"general"} onChangeCurrent={handleChangeCurrent} />
            <Card type={"business"} onChangeCurrent={handleChangeCurrent} />
          </CardArea>
        : <ProcessIndicator current={current} process={process} />
      }
      <SignupBlock>
        {render()}
      </SignupBlock>
    </>
	);
};

const CardArea = styled.div`
  margin-top: 111px;
  font-size: var(--fontSize18);

  display: flex; 
`

const SignupBlock = styled.div`
	width: 100%;

	.deactivate {
		display: none;
	}
`;

export default SignupContainer;
