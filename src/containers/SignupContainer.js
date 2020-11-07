import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import styled from 'styled-components';

import { addIDPW, addPersonalInfo, addPhone, addAgreement } from '../modules/reducers/signup';

import Signup01 from '../components/Signup01';
import Signup02 from '../components/Signup02';
import Signup03 from '../components/Signup03';
import Signup04 from '../components/Signup04';

const SignupBlock = styled.div`
  width:100%;
  
  .deactivate {
    display: none;
  }

`

const SignupContainer = () => {
  const dispatch = useDispatch();

  const onClickNext = (formData, process, target) => {
    console.log(formData, target);
    switch(process){
      case 1:
        target.classList.add('deactivate');
        target.parentNode.children[process].classList.remove('deactivate');
        dispatch(addIDPW(formData));
        break;
      case 2:
        target.classList.add('deactivate');
        target.parentNode.children[process].classList.remove('deactivate');
        dispatch(addPersonalInfo(formData));
        break;
      case 3:
        target.classList.add('deactivate');
        target.parentNode.children[process].classList.remove('deactivate');
        dispatch(addPhone(formData));
        break;
      case 4:
        target.classList.add('deactivate');
        target.parentNode.children[process].classList.remove('deactivate');
        dispatch(addAgreement(formData));
        break;
      default:
        console.log("onClickNext error");
    }
    
    
  }
  return (
    <SignupBlock>
      <Signup01 onClickNext={onClickNext} />
      <Signup02 onClickNext={onClickNext} className={"deactivate"}/>
      <Signup03 onClickNext={onClickNext} className={"deactivate"}/>
      <Signup04 onClickNext={onClickNext} className={"deactivate"}/>
    </SignupBlock>
  );
}

export default SignupContainer;
