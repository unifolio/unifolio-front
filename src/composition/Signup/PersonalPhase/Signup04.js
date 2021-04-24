import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components';

const Signup04 = (props) => {
  const { onClickNext, className } = props;
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
  });

  const handleCheck02Change = useCallback((e) => {
    SetCheck02(e.target.checked)
  });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onClickNext({approval_access_terms, approval_marketing}, 4);
  });

  return (
    <SignupRowBlock className={className}>
      <SignupForm onSubmit={handleSubmit}>
        개인정보 수집 및 이용에 관한 동의 (필수) <input type="checkbox" name="check01" onChange={handleCheck01Change} /> <br />
        <div>
          내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
        </div>
        홍보 및 마케팅에 관한 동의 (선택) <input type="checkbox" name="check02" onChange={handleCheck02Change}/> <br />
        <div>
          내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
        </div>
        <button type="submit"> 완료하기 </button>
      </SignupForm>
    </SignupRowBlock>
  );
}

const SignupRowBlock = styled.div`
  padding-top:1rem;
  
  display:flex;
  flex-direction: column;
`
const SignupForm = styled.form`
  display:flex;
  flex-direction:column;
`

export default Signup04;
