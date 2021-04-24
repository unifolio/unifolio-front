import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { addIDPW, addPersonalInfo, addPhone, addAgreement, getSignupStateThunk } from '../modules/reducers/signup';

import Card from 'composition/Signup/Card';
import Header from 'composition/Signup/Header';
import ProcessIndicator from 'composition/Signup/ProcessIndicator';

import Signup01 from '../components/Signup/Signup01';
import Signup02 from '../components/Signup/Signup02';
import Signup03 from '../components/Signup/Signup03';
import Signup04 from '../components/Signup/Signup04';

import API from '../lib/api';

const SignupContainer = () => {
	const dispatch = useDispatch();
  const [current, setCurrent] = useState("default");
  const [process, setProcess] = useState(0);

  const handleChangeCurrent = (value) => {
    setCurrent(value);
    setProcess(1);
  }

  const renderByProcess = () => {
    switch (process) {
			case 1:
				return <Signup01 onClickNext={onClickNext} />
			case 2:
				return <Signup02 onClickNext={onClickNext} />
			case 3:
				return <Signup03 onClickNext={onClickNext} />
			case 4:
        return <Signup04 onClickNext={onClickNext} />
			default:
        return <></>
		}
  }

	const onClickNext = async (formData, process, target) => {
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
				dispatch(addAgreement(formData));
        const data = dispatch(getSignupStateThunk());
        const response = await API.post.newUser(data);
        
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
    setProcess(process+1);
	};
	return (
    <>
      <Header current={current} process={process} />
      {current === "default" 
        ? <CardArea>
            <Card type={"personal"} onChangeCurrent={handleChangeCurrent} />
            <Card type={"corporation"} onChangeCurrent={handleChangeCurrent} />
          </CardArea>
        : <ProcessIndicator process={process} />
      }
      <SignupBlock>
        {renderByProcess()}
      </SignupBlock>
    </>
	);
};

const CardArea = styled.div`
  margin-top: 111px;
  display: flex; 
`

const SignupBlock = styled.div`
	width: 100%;

	.deactivate {
		display: none;
	}
`;

export default SignupContainer;
