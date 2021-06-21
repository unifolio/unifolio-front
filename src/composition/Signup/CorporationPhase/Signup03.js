import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';

import styles from 'lib/styles';
import UnsettedButton from 'components/common/UnsettedButton.js';

const Signup03 = ({ onClickNext, className }) => {
  const [approval_access_terms, SetCheck01] = useState(false)
  const [approval_marketing, SetCheck02] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (approval_access_terms && approval_marketing) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  })

  const handleCheck01Change = useCallback((e) => {
    SetCheck01(e.target.checked)
  }, []);

  const handleCheck02Change = useCallback((e) => {
    SetCheck02(e.target.checked)
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onClickNext({approval_access_terms, approval_marketing}, 3);
  }, []);

  return (
    <SignupRowBlock className={className}>
      <SignupForm onSubmit={handleSubmit}>
        법인정보 수집 및 이용에 관한 동의 (필수) <input type="checkbox" name="check01" onChange={handleCheck01Change} /> <br />
        <div>
          내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
        </div>
        홍보 및 마케팅에 관한 동의 (선택) <input type="checkbox" name="check02" onChange={handleCheck02Change}/> <br />
        <div>
          내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
        </div>
        <SignupSubmitButton active={isActive}> 회원 가입하기 </SignupSubmitButton>
      </SignupForm>
    </SignupRowBlock>
  );
}

const SignupSubmitButton = styled(UnsettedButton)`
  width: 100%;
  height: 64px;
  color: ${props => props.active ? "white" : "#BCB6B6"};
  background-color: ${props => props.active ? styles.palette.unifolioBlue : "#F4F4F4"};
  pointer-events: ${props => props.active ? "" : "none"}; 
  border-radius: 5px;
  
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
`

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
