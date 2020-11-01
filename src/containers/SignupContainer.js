import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { addIDPW, addPersonalInfo, addPhone, addAgreement } from '../modules/reducers/signup';

import Signup01 from '../components/Signup01';
import Signup02 from '../components/Signup02';
import Signup03 from '../components/Signup03';
import Signup04 from '../components/Signup04';

const SignupContainer = () => {
  const dispatch = useDispatch();

  const onClickNext = (formData, process) => {
    console.log(formData);
    switch(process){
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
        break;
      default:
        console.log("onClickNext error");
    }
    
    
  }
  return (
    <>
      <Signup01 onClickNext={onClickNext} />
      <Signup02 onClickNext={onClickNext} />
      <Signup03 onClickNext={onClickNext} />
      <Signup04 onClickNext={onClickNext} />
    </>
  );
}

export default SignupContainer;
