import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
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
  
  useEffect(() => {

  }, [process])

  const handleChangeCurrent = (value) => {
    setCurrent(value);
    setProcess(1);
  }

  const renderByProcess = () => {
    switch (process) {
			case 1:
				// target.classList.add('deactivate');
				// target.parentNode.children[process].classList.remove('deactivate');
				return <Signup01 onClickNext={onClickNext} />
			case 2:
				// target.classList.add('deactivate');
				// target.parentNode.children[process].classList.remove('deactivate');
				return <Signup02 onClickNext={onClickNext} className={''} />
				
			case 3:
				// target.classList.add('deactivate');
				// target.parentNode.children[process].classList.remove('deactivate');
				return <Signup03 onClickNext={onClickNext} className={''} />
				
			case 4:
				break;
			default:
				console.log('renderByProcess error');
		}
  }

	const onClickNext = async (formData, process, target) => {
		switch (process) {
			case 1:
				// target.classList.add('deactivate');
				// target.parentNode.children[process].classList.remove('deactivate');
				dispatch(addIDPW(formData));
				break;
			case 2:
				// target.classList.add('deactivate');
				// target.parentNode.children[process].classList.remove('deactivate');
				dispatch(addPersonalInfo(formData));
				break;
			case 3:
				// target.classList.add('deactivate');
				// target.parentNode.children[process].classList.remove('deactivate');
				dispatch(addPhone(formData));
				break;
			case 4:
				dispatch(addAgreement(formData));
        const data = dispatch(getSignupStateThunk());
        const response = await API.post.newUser(data);
        
        if (response.status === 200) {
          alert('회원가입이 완료되었습니다');
          // window.location.href = '/signin';
        } else {
          alert("not ok");
        }
				break;
			default:
				console.log('onClickNext error');
		}
    setProcess(process);
	};
	return (
    <>
      <Header current={current} process={process} />
      {current === "default" 
        && <CardArea>
          <Card type={"personal"} onChangeCurrent={handleChangeCurrent} />
          <Card type={"corporation"} onChangeCurrent={handleChangeCurrent} />
        </CardArea>
      }
      <ProcessIndicator />
      <SignupBlock>
        {renderByProcess()}
        {/* <Signup01 onClickNext={onClickNext} />
        <Signup02 onClickNext={onClickNext} className={'deactivate'} />
        <Signup03 onClickNext={onClickNext} className={'deactivate'} />
        <Signup04 onClickNext={onClickNext} className={'deactivate'} /> */}
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
