import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';
import styles from 'lib/styles';

const Signup02 = ({ onClickNext }) => {
  const [signupState, setSignupState] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const rrnRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.onload = () => {
      console.log('is onload ?');
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    for (const key of ['name', 'rrn', 'postcode', 'address', 'addressDetail']) {
      if (!signupState[key]) {
        setIsComplete(false);
        return;
      }
    }
    setIsComplete(true);
  }, [signupState]);

  const handleClickPostAdress = (open = false) => {
    if (open === false) {
      if (document.querySelector('input#postcode').value !== '') {
        return;
      }
    }

    new window.daum.Postcode({
      oncomplete: function (data) {
        let postcode = data.zonecode;
        let address = data.address;
        document.querySelector('input#postcode').value = postcode;
        document.querySelector('input#address').value = address;
        setSignupState((state) => ({ ...state, postcode, address }));
      },
    }).open();
  };

  const handleChangeName = ({ target }) => {
    setSignupState((state) => ({ ...state, name: target.value }));
  };

  const handleChangeRRN = ({ target }) => {
    // if (
    //   target.value.length > 14 ||
    //   (target.value.length > 6 && !target.value[6].match(/-/))
    // ) {
    //   alert('주민등록번호를 정확하게 입력해주세요');
    //   target.value = '';
    //   setSignupState((state) => ({ ...state, rrn: '' }));
    // }
    setSignupState((state) => ({ ...state, rrn: target.value }));
  };

  const handleChangeAddressDetail = ({ target }) => {
    setSignupState((state) => ({ ...state, addressDetail: target.value }));
  };

  const handlePrev = () => {};
  const handleNext = () => {
    if (!rrnValidate()) return;
    onClickNext(
      {
        ...signupState,
        rrn: signupState.rrn.replace(/-/g, ''),
        address_postcode: signupState.postcode,
        address_detail: signupState.addressDetail,
      },
      2,
    );
  };
  const rrnRegExp =
    /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-4][0-9]{6}$/;
  function rrnValidate() {
    if (!rrnRegExp.test(signupState.rrn)) {
      setErrorMessage('올바른 주민등록번호가 아닙니다.');
      rrnRef.current.focus();
      return false;
    }
    const rrnNum = signupState.rrn.split('-');
    const arrNum1 = rrnNum[0].split(''); // 주민번호 앞자리숫자 6개를 담을 배열
    const arrNum2 = rrnNum[1].split(''); // 주민번호 뒷자리숫자 7개를 담을 배열
    let tempSum = 0;

    for (let i = 0; i < arrNum1.length; i++) {
      tempSum += arrNum1[i] * (2 + i);
    }

    for (let i = 0; i < arrNum2.length - 1; i++) {
      if (i >= 2) {
        tempSum += arrNum2[i] * i;
      } else {
        tempSum += arrNum2[i] * (8 + i);
      }
    }
    if ((11 - (tempSum % 11)) % 10 != arrNum2[6]) {
      setErrorMessage('올바른 주민등록번호가 아닙니다.');
      rrnRef.current.focus();
      return false;
    } else {
      return true;
    }
  }

  return (
    <SignupRowBlock>
      <SignupForm>
        <SignupNameInput onChange={handleChangeName} /> <br />
        <SignupRRNInput ref={rrnRef} onChange={handleChangeRRN} /> <br />
        <SignupPostCodeInput onClick={handleClickPostAdress} /> <br />
        <SignupAddressInput onClick={handleClickPostAdress} /> <br />
        <SignupDetailAddressInput onChange={handleChangeAddressDetail} /> <br />
        <SignupButtonsLayer>
          <SignupPrevButton type='button' onClick={handlePrev}>
            뒤로가기
          </SignupPrevButton>
          <SignupNextButton
            type='button'
            onClick={handleNext}
            isComplete={isComplete}
            disabled={!isComplete}
          >
            다음으로
          </SignupNextButton>
        </SignupButtonsLayer>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </SignupForm>
    </SignupRowBlock>
  );
};

const SignupRowBlock = styled.div`
  padding-top: 1rem;

  display: flex;
  flex-direction: column;
`;
const SignupForm = styled.div`
  display: flex;
  flex-direction: column;
`;
const SignupNameInput = styled.input.attrs((props) => ({
  type: 'text',
  name: 'name',
  placeholder: '이름',
}))`
  ${styles.layout.signInput}
`;

const SignupRRNInput = styled.input.attrs((props) => ({
  type: 'text',
  name: 'rrn',
  placeholder: '주민등록번호 (881234-1234567)',
}))`
  ${styles.layout.signInput}
`;

const SignupPostCodeInput = styled.input.attrs((props) => ({
  type: 'text',
  name: 'postcode',
  id: 'postcode',
  placeholder: '우편번호',
  readOnly: true,
  required: true,
}))`
  ${styles.layout.signInput}
`;

const SignupAddressInput = styled.input.attrs((props) => ({
  type: 'text',
  name: 'address',
  id: 'address',
  placeholder: '주소',
  readOnly: true,
  required: true,
}))`
  ${styles.layout.signInput}
`;
const SignupDetailAddressInput = styled.input.attrs((props) => ({
  type: 'text',
  name: 'detail_address',
  id: 'detail_address',
  placeholder: '상세 주소',
  required: true,
}))`
  ${styles.layout.signInput}
`;

const SignupButtonsLayer = styled.div`
  display: flex;

  button + button {
    margin-left: 15px;
  }
`;

const SignupNextButton = styled.button`
  height: 3rem;
  border: none;
  padding: 0 1rem;
  flex-grow: 1;

  ${({ isComplete }) => {
    return isComplete
      ? css`
          background-color: ${styles.palette.unifolioBlue};
          color: white;
          cursor: pointer;
        `
      : css`
          background-color: ${styles.palette.deactiveBackgroundGrey};
          color: ${styles.palette.deactiveGrey};
        `;
  }}
`;

const SignupPrevButton = styled.button`
  height: 3rem;
  border: none;
  padding: 0 1rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  margin-top: 10px;
  color: red;
`;
export default Signup02;
