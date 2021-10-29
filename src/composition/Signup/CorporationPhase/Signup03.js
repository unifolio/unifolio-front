import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import styles from 'lib/styles';
import UnsettedButton from 'components/common/UnsettedButton.js';

const Signup03 = ({ signupInputData, onClickNext, onClickBack }) => {
  const [approval_access_terms, setCheck01] = useState(false)
  const [approval_marketing, setCheck02] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (approval_access_terms && approval_marketing) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  })

  const handleCheck01Change = (e) => {
    setCheck01(e.target.checked)
  }

  const handleCheck02Change = (e) => {
    setCheck02(e.target.checked)
  }

  const handleClickBackward = () => {
    console.log("handleClickBackward")
    onClickBack(2);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onClickNext({approval_access_terms, approval_marketing}, 3);
  }

  return (
    <SignupRowBlock>
      <SignupForm onSubmit={handleSubmit}>
        법인정보 수집 및 이용에 관한 동의 (필수) <input type="checkbox" name="check01" onChange={handleCheck01Change} /> <br />
        <div>
          내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
        </div>
        홍보 및 마케팅에 관한 동의 (선택) <input type="checkbox" name="check02" onChange={handleCheck02Change}/> <br />
        <div>
          내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
        </div>
        
      </SignupForm>
      <Buttons>
        <BackwardButton onClick={handleClickBackward}> 뒤로가기 </BackwardButton>
        <SubmitButton onClick={handleSubmit} active={isActive}> 회원 가입하기 </SubmitButton>
      </Buttons>
    </SignupRowBlock>
  );
}

const Buttons = styled.div`
  display: flex;
`;

const SignupButton = styled(UnsettedButton)`
  width: 100%;
  height: 64px;
  color: ${props => props.active ? "white" : "#BCB6B6"};
  background-color: ${props => props.active ? styles.palette.unifolioBlue : "#F4F4F4"};
  border-radius: 5px;
  
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
`;

const SubmitButton = styled(SignupButton)`
  color: ${props => props.active ? "white" : "#BCB6B6"};
  background-color: ${props => props.active ? styles.palette.unifolioBlue : "#F4F4F4"}; 
  pointer-events: ${props => props.active ? "" : "none"}; 
`;

const BackwardButton = styled(SignupButton)`
  width: 40%;
  margin-right: 15px;
  background-color: ${styles.palette.unifolioBlue}; 
  color: white;
`;

const SignupRowBlock = styled.div`
  padding-top:1rem;
  
  display:flex;
  flex-direction: column;
`
const SignupForm = styled.form`
  display:flex;
  flex-direction:column;
`

export default Signup03;
