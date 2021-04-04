import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Select } from 'antd';
// 원래 03
const PersonalUnionCreate01 = (props) => {
	const { onClickNext, className } = props;

	const [unionCreate03Inputs, setUnionCreate03Inputs] = useState({
		address: '',
		address_detail: '',
		address_postcode: '',
		phone_union_1: '',
    phone_union_2: '',
    phone_union_3: '',
		fax_union_1: '',
    fax_union_2: '',
    fax_union_3: '',
		email_union_id: '',
    email_union_domain: ''
	});
	const { 
    address, address_detail, address_postcode, 
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
      if (document.querySelector("input[name=address_postcode]").value !== "") {
        return;
      }
    }
    
    new window.daum.Postcode({
      oncomplete: (data) => {
        let address_postcode = data.zonecode;
        let address = data.address;
        setUnionCreate03Inputs({
					...unionCreate03Inputs,
					['address_postcode']: address_postcode,
					['address']: address,
				});
        onClickPostAddress({address_postcode, address});
      }
    }).open();

	};
  const onClickPostAddress = ({address_postcode, address}) => {
    document.querySelector("input[name=address_postcode]").value = address_postcode;
    document.querySelector("input[name=address]").value = address;
  }

  const onChangeSelect = ({type, value}) => {
    console.log(type, value)
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
		onClickNext(unionCreate03Inputs, 3, layoutRef.current);
	};

	return (
		<PersonalUnionCreate03Layout className={className} ref={layoutRef}>
      <section style={{marginLeft:"15vw", marginRight:"15vw"}}>
        <div className="row">
          <div className="title">
            <h2>조합 사무소 주소</h2>
          </div>
          <div className="contents">
            <div className="column column-7">
              <Input className="union-create--input" name={`address_postcode`} value={address_postcode} placeholder="우편번호" readOnly
                // onChange={onChange}
                onClick={(e) => {
                  e.target.blur();
                  clickPostAdress();
                }}
              />
              <Input className="union-create--input" name={`address`} value={address} size="large" placeholder="주소 (도로명 검색)" readOnly
                onClick={(e) => {
                  e.target.blur();
                  clickPostAdress();
                }}
              />
              <Input className="union-create--input" name={`address_detail`} value={address_detail} placeholder="상세주소 입력" onChange={onChange} />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="row">
          <div className="title">
            <h2>조합 사무소 전화번호</h2>
          </div>
          <div className="column contents">
            <Input className="union-create--input" name={`phone_union_1`} value={phone_union_1} onChange={onChange} />
            <span>-</span>
            <Input className="union-create--input" name={`phone_union_2`} value={phone_union_2} onChange={onChange} />
            <span>-</span>
            <Input className="union-create--input" name={`phone_union_3`} value={phone_union_3} onChange={onChange} />
          </div>
        </div>
      </section>
      <section>
        <div className="row">
          <div className="title">
            <h2>조합 사무소 FAX</h2>
          </div>
          <div className="column contents">
            <Input className="union-create--input" name={`fax_union_1`} value={fax_union_1} onChange={onChange} />
            <span>-</span>
            <Input className="union-create--input" name={`fax_union_2`} value={fax_union_2} onChange={onChange} />
            <span>-</span>
            <Input className="union-create--input" name={`fax_union_3`} value={fax_union_3} onChange={onChange} />
          </div>
        </div>
      </section>
      <section>
        <div className="row">
          <div className="title">
            <h2>조합 사무소 E-mail</h2>
          </div>
          <div className="column contents">
            <Input className="union-create--input" name={`email_union_id`} value={email_union_id} placeholder="메일 계정" onChange={onChange} />
            <Select className={"email_union_domain_select"} placeholder="메일 도메인 선택"
              onChange={(value) => { console.log(value); onChangeSelect({type:"email", value}) }}
            >
							<Select.Option value="@gmail.com">gmail.com</Select.Option>
							<Select.Option value="@naver.com">naver.com</Select.Option>
							<Select.Option value="@hanmail.net">hanmail.net</Select.Option>
							<Select.Option value="@self">직접 입력</Select.Option>
						</Select>
            <Input className="union-create--input email_union_domain" name={`email_union_domain`} onChange={onChange} placeholder="직접 입력"/>
          </div>
        </div>
      </section>
      <Button onClick={handleNext} size="large"> 다음 단계 진행하기 </Button>
		</PersonalUnionCreate03Layout>
	);
};

const Input = styled.input`

`

const PersonalUnionCreate03Layout = styled.div`
  .row {
    display: flex;
    flex-direction: column;
  }

  .column {
    display:flex;
    &-7 {
      max-width: 70vw;
    }
  }

  .title, .contents {
    width: 100%;
    margin-bottom: 10px;
  }

  section + section {
    margin-top: 50px;
  }

  input + input {
    margin-left: 10px;
  }

  input[name=address], input[name=address_postcode] {
    cursor: pointer;
  }

  .ant-input[name=address], .ant-input[name=address_postcode] {
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

  .email_union_domain {
    display: none;
  }

  .union-create--input {
    height: 50px;
    border: solid 1px #C4C4C4;
  }
`

export default PersonalUnionCreate01;
