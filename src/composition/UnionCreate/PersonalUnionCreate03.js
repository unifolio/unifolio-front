import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Input, Button, Select } from 'antd';

const PersonalUnionCreate03 = (props) => {
	const { onClickNext, className } = props;

	const [unionCreate03Inputs, setUnionCreate03Inputs] = useState({
		address_business_union: '', address_detail_business_union: '', address_postcode_union: '',
		phone_union_1: '', phone_union_2: '', phone_union_3: '',
		fax_union_1: '', fax_union_2: '', fax_union_3: '',
		email_union_id: '', email_union_domain: ''
	});
	const { 
    address_business_union, address_detail_business_union, address_postcode_union, 
    phone_union_1, phone_union_2, phone_union_3, 
    fax_union_1, fax_union_2, fax_union_3, 
    email_union_id 
  } = unionCreate03Inputs;

  useEffect(() => {
    document.querySelector(".ant-input-disabled").className = document.querySelector(".ant-input-disabled").className.split(" ").slice(0,1).join(" ");
    const script = document.createElement('script');
    script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.body.appendChild(script);
	}, []);

	const clickPostAdress = (open = false) => {
    if (open === false) {
      if (document.querySelector("input[name=address_postcode_union]").value !== "") {
        return;
      }
    }
    
    new window.daum.Postcode({
      oncomplete: (data) => {
        let address_postcode_union = data.zonecode;
        let address_business_union = data.address;
        setUnionCreate03Inputs({
					...unionCreate03Inputs,
					['address_postcode_union']: address_postcode_union,
					['address_business_union']: address_business_union,
				});
        onClickPostAddress({address_postcode_union, address_business_union});
      }
    }).open();

	};
  const onClickPostAddress = ({address_postcode_union, address_business_union}) => {
    console.log("onClickPostAddress",address_postcode_union, address_business_union);
    document.querySelector("input[name=address_postcode_union]").value = address_postcode_union;
    document.querySelector("input[name=address_business_union]").value = address_business_union;
  }

  const onChangeSelect = ({type, value}) => {
    switch(type) {
      case "email":
        if (value === "@self") {
          document.querySelector(".email_union_domain_select").style.display = "none";
          document.querySelector(".email_union_domain").style.display = "block";
          return;
        }
        setUnionCreate03Inputs({
          ...unionCreate03Inputs,
          ['email_union_domain']: value,
        });
        break;
      default:
        console.log("error");
        break;
    }
  }

	const onChange = (e) => {
		setUnionCreate03Inputs({
			...unionCreate03Inputs,
			[e.target.name]: e.target.value,
		});
		console.log(unionCreate03Inputs);
	};

	const layoutRef = useRef();
	const handleNext = (e) => {
		// 데이터 넘김
    // phone_union_1: '', phone_union_2: '', phone_union_3: '',
		// fax_union: '', fax_union_1: '', fax_union_2: '', fax_union_3: '',
		// email_union_id: '', email_union_domain: ''

    const parsedState = {};
    parsedState['phone_union'] = `${unionCreate03Inputs['phone_union_1']}-${unionCreate03Inputs['phone_union_2']}-${unionCreate03Inputs['phone_union_3']}`;
    parsedState['fax_union'] = `${unionCreate03Inputs['fax_union_1']}-${unionCreate03Inputs['fax_union_2']}-${unionCreate03Inputs['fax_union_3']}`;
    parsedState['email_union'] = `${unionCreate03Inputs['email_union_id']}${unionCreate03Inputs['email_union_domain']}`;
    
    const returnState = {
      ...unionCreate03Inputs,
      ...parsedState
    }

		onClickNext(returnState, 3, layoutRef.current);
	};

	return (
		<PersonalUnionCreate03Layout className={className} ref={layoutRef}>
      <section>
        <div className="row">
          <div className="title">
            <h2>조합 사무소 주소</h2>
          </div>
          <div className="contents">
            <Input name={`address_business_union`} value={address_business_union} size="large" placeholder="주소 (도로명 검색)" readOnly
              onClick={(e) => {
                e.target.blur();
                clickPostAdress();
              }}
            />
          </div>
          <div className="column">
            <Input name={`address_detail_business_union`} value={address_detail_business_union} style={{ width: '60%' }} size="large" placeholder="상세주소 입력" onChange={onChange} />
            <Input name={`address_postcode_union`} value={address_postcode_union} size="large" style={{ width: '40%' }} placeholder="우편번호" readOnly
              // onChange={onChange}
              onClick={(e) => {
                e.target.blur();
                clickPostAdress();
              }}
            />
          </div>
        </div>
      </section>
      <section>
        <div className="row">
          <div className="title">
            <h2>조합 사무소 전화번호</h2>
          </div>
          <div className="column contents">
            <Input name={`phone_union_1`} value={phone_union_1} style={{ width: '30%' }} size="large" placeholder="" onChange={onChange} />
            <span>-</span>
            <Input name={`phone_union_2`} value={phone_union_2} style={{ width: '30%' }} size="large" placeholder="" onChange={onChange} />
            <span>-</span>
            <Input name={`phone_union_3`} value={phone_union_3} style={{ width: '30%' }} size="large" placeholder="" onChange={onChange} />
          </div>
        </div>
      </section>
      <section>
        <div className="row">
          <div className="title">
            <h2>조합 사무소 FAX</h2>
          </div>
          <div className="column contents">
            <Input name={`fax_union_1`} value={fax_union_1} style={{ width: '30%' }} size="large" placeholder="" onChange={onChange} />
            <span>-</span>
            <Input name={`fax_union_2`} value={fax_union_2} style={{ width: '30%' }} size="large" placeholder="" onChange={onChange} />
            <span>-</span>
            <Input name={`fax_union_3`} value={fax_union_3} style={{ width: '30%' }} size="large" placeholder="" onChange={onChange} />
          </div>
        </div>
      </section>
      <section>
        <div className="row">
          <div className="title">
            <h2>조합 사무소 E-mail</h2>
          </div>
          <div className="column contents">
            <Input name={`email_union_id`} value={email_union_id} style={{ width: '30%' }} size="large" placeholder="메일 계정" onChange={onChange} />
            <Select className={"email_union_domain_select"} placeholder="메일 도메인 선택" size="large" 
              onChange={(value) => { console.log(value); onChangeSelect({type:"email", value}) }}
            >
							<Select.Option value="@gmail.com">gmail.com</Select.Option>
							<Select.Option value="@naver.com">naver.com</Select.Option>
							<Select.Option value="@hanmail.net">hanmail.net</Select.Option>
							<Select.Option value="@self">직접 입력</Select.Option>
						</Select>
            <Input name={`email_union_domain`} className={"email_union_domain"} onChange={onChange} placeholder={"직접 입력"} size="large"/>
          </div>
        </div>
      </section>
      <Button onClick={handleNext} size="large"> 다음 단계 진행하기 </Button>
		</PersonalUnionCreate03Layout>
	);
};

const PersonalUnionCreate03Layout = styled.div`
  section + section {
    margin-top: 50px;
  }

  .ant-input[name=address_business_union], .ant-input[name=address_postcode_union] {
    cursor:pointer;
  }

  .ant-input + span, span + .ant-input, .ant-input + .ant-select, .ant-input + .ant-input, .ant-select + .ant-input {
    margin-left: 15px;
  }

  span {
    margin-left: 10px;
    margin-right: 10px;

    display:flex;
    align-items: center;
    flex-shrink: 0; // == flex-basis: content-size 
  }

  .ant-input + .ant-input {
    margin-left: 15px;
  }

  .title, .contents {
    width: 100%;
    margin-bottom: 10px;
  }

  .row {
    display: flex;
    flex-direction: column;
  }

  .column {
    display:flex;
  }

  .email_union_domain {
    display: none;
  }
`

export default PersonalUnionCreate03;
