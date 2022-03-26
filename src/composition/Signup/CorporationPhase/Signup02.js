import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import styles from 'lib/styles';
import UnsettedButton from 'components/common/UnsettedButton.js';

import * as Icons from 'components/common/Icons';

const Signup02 = ({ onClickNext, onClickBack, signupInputData }) => {
  const [corporate_name, setCorporateName] = useState(
    signupInputData.corporate_name ?? '',
  );
  const [company_registration_number, setCompanyRegistrationNumber] = useState(
    signupInputData.company_registration_number ?? '',
  );
  const [corporate_registration, setCorporateRegistration] = useState(
    signupInputData.corporate_registration ?? '',
  );
  const [postcode, setPostCode] = useState(
    signupInputData.address_postcode_business ?? '',
  );
  const [address, setAddress] = useState(
    signupInputData.address_business ?? '',
  );
  const [addressDetail, setAddressDetail] = useState(
    signupInputData.address_detail_business ?? '',
  );
  const [isActive, setIsActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    if (
      isActivatable([
        corporate_name,
        company_registration_number,
        corporate_registration,
        postcode,
        address,
        addressDetail,
      ])
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  });

  const isActivatable = (dependentData) => {
    return dependentData.includes('') ? false : true;
  };
  const clickPostAdress = (open = false) => {
    console.log('open', open);
    if (open === false) {
      if (document.querySelector('input#postcode').value !== '') {
        return;
      }
    }

    new window.daum.Postcode({
      oncomplete: function (data) {
        console.log(data);
        let postcode = data.zonecode;
        let address = data.address;
        document.querySelector('input#postcode').value = postcode;
        document.querySelector('input#address').value = address;
        setPostCode(postcode);
        setAddress(address);
      },
    }).open();
  };

  const handleChangeCorporateName = (e) => {
    setCorporateName(e.target.value);
  };

  const handleChangeCompanyRegistrationNumber = (e) => {
    if (e.target.value.length > 12) {
      alert('사업자등록번호는 10자를 초과할 수 없습니다.');
      e.target.value = e.target.value.slice(0, e.target.value.length - 1);
    }
    setCompanyRegistrationNumber(addAutoHyphen(e.target.value));
  };
  const addAutoHyphen = (str) => {
    const value = str.replace(/[^0-9]/g, '');
    let tmp = '';
    if (value.length < 4) {
      return value;
    } else if (value.length < 6) {
      tmp += value.substr(0, 3);
      tmp += '-';
      tmp += value.substr(3);
      return tmp;
    } else if (value.length < 11) {
      tmp += value.substr(0, 3);
      tmp += '-';
      tmp += value.substr(3, 2);
      tmp += '-';
      tmp += value.substr(5);
      return tmp;
    }
    return str;
  };
  const addAutoHyphen_bubinNum = (str) => {
    const value = str.replace(/[^0-9]/g, '');
    let tmp = '';
    if (value.length < 7) {
      return value;
    } else {
      tmp += value.substr(0, 6);
      tmp += '-';
      tmp += value.substr(6);
      return tmp;
    }
    return str;
  };
  const checkVaildBizNum = (number) => {
    let numberMap = number
      .replace(/-/gi, '')
      .split('')
      .map(function (d) {
        return parseInt(d, 10);
      });
    if (numberMap.length === 10) {
      let keyList = [1, 3, 7, 1, 3, 7, 1, 3, 5];
      let chk = 0;
      keyList.forEach((d, i) => {
        chk += d * numberMap[i];
      });
      chk += parseInt((keyList[8] * numberMap[8]) / 10, 10);
      return Math.floor(numberMap[9]) === (10 - (chk % 10)) % 10;
    }
    return false;
  };
  const handleCorporateRegistration = (e) => {
    if (e.target.value.length > 14) {
      alert('법인등록번호는 13자를 초과할 수 없습니다.');
      e.target.value = e.target.value.slice(0, e.target.value.length - 1);
      return;
    }
    setCorporateRegistration(addAutoHyphen_bubinNum(e.target.value));
  };
  function checkVaildBubinNum(bubinNum) {
    bubinNum = bubinNum.replace(/-/gi, '');
    const as_Biz_no = String(bubinNum);
    let I_TEMP_SUM = 0;

    let I_CHK_DIGIT = 0;

    if (bubinNum.length != 13) {
      return false;
    }

    for (let index01 = 1; index01 < 13; index01++) {
      let i = index01 % 2;
      let j = 0;

      if (i == 1) j = 1;
      else if (i == 0) j = 2;

      I_TEMP_SUM =
        I_TEMP_SUM +
        parseInt(as_Biz_no.substring(index01 - 1, index01), 10) * j;
    }

    I_CHK_DIGIT = I_TEMP_SUM % 10;
    if (I_CHK_DIGIT != 0) I_CHK_DIGIT = 10 - I_CHK_DIGIT;

    if (as_Biz_no.substring(12, 13) != String(I_CHK_DIGIT)) return false;
    return true;
  }

  const handleChangeAddressDetail = (e) => {
    setAddressDetail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkVaildBizNum(company_registration_number))
      return setErrorMessage('사업자번호가 올바르지 않습니다.');
    if (!checkVaildBubinNum(corporate_registration))
      return setErrorMessage('법인번호가 올바르지 않습니다.');

    onClickNext(
      {
        corporate_name,
        company_registration_number: company_registration_number.replace(
          /-/gi,
          '',
        ),
        corporate_registration,
        address_postcode_business: postcode,
        address_business: address,
        address_detail_business: addressDetail,
      },
      2,
    );
  };
  const handleClickBackward = () => {
    onClickBack(1);
  };

  return (
    <SignupRowBlock>
      <SignupForm>
        <SignupCorporationNameInput
          value={corporate_name}
          onChange={handleChangeCorporateName}
        />
        <br />
        <div style={{ width: '100%' }}>
          <SignupCompanyRegistrationNumberInput
            value={addAutoHyphen(company_registration_number)}
            onChange={handleChangeCompanyRegistrationNumber}
          />
        </div>
        <br />
        <SignupCorporateRegistrationInput
          value={addAutoHyphen_bubinNum(corporate_registration)}
          onChange={handleCorporateRegistration}
        />
        <br />
        {/* <SignupButton onClick={(e) => {e.preventDefault(); clickPostAdress(true)}}> 우편번호 찾기 </SignupButton> <br /> */}
        <div style={{ width: '100%' }}>
          <SignupPostCodeInput value={postcode} onClick={clickPostAdress} />
        </div>
        <br />
        <SignupAddressInput value={address} onClick={clickPostAdress} /> <br />
        <SignupDetailAddressInput
          value={addressDetail}
          onChange={handleChangeAddressDetail}
        />
        <br />
      </SignupForm>
      <Buttons>
        <BackwardButton onClick={handleClickBackward}>뒤로가기</BackwardButton>
        <SubmitButton onClick={handleSubmit} active={isActive}>
          다음으로
        </SubmitButton>
      </Buttons>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </SignupRowBlock>
  );
};

const Buttons = styled.div`
  display: flex;
`;

const SignupButton = styled(UnsettedButton)`
  width: 100%;
  height: 64px;
  border-radius: 5px;
  background-color: #f4f4f4;

  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
`;

const SubmitButton = styled(SignupButton)`
  color: ${(props) => (props.active ? 'white' : '#BCB6B6')};
  background-color: ${(props) =>
    props.active ? styles.palette.unifolioBlue : '#F4F4F4'};
  pointer-events: ${(props) => (props.active ? '' : 'none')};
`;

const BackwardButton = styled(SignupButton)`
  width: 40%;
  margin-right: 15px;
  background-color: ${styles.palette.unifolioBlue};
  color: white;
`;

const SignupRowBlock = styled.div`
  padding-top: 1rem;

  display: flex;
  flex-direction: column;
`;
const SignupForm = styled.div`
  display: flex;
  flex-direction: column;
`;
const SignupCorporationNameInput = styled.input.attrs((props) => ({
  type: 'text',
  name: 'corporate_name',
  placeholder: '법인명',
}))`
  ${styles.layout.signInput}
`;

const SignupCompanyRegistrationNumberInput = styled.input.attrs((props) => ({
  type: 'text',
  name: 'company_registration_number',
  placeholder: '사업자등록번호(10자리)',
}))`
  width: 100%;
  ${styles.layout.signInput}
`;

const SignupCorporateRegistrationInput = styled.input.attrs((props) => ({
  type: 'text',
  name: 'corporate_registration',
  placeholder: '법인등록번호(13자리)',
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
  width: 100%;
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
const ErrorMessage = styled.div`
  text-align: center;
  margin-top: 10px;
  color: red;
`;

export default Signup02;
