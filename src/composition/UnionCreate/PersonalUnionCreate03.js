import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Input, Button, Select } from 'antd';

const PersonalUnionCreate03 = (props) => {
	const { onClickNext, className } = props;

	const [unionCreate03Inputs, setUnionCreate03Inputs] = useState({
		address: '',
		address_detail: '',
		address_postcode: '',
		phone_union: '',
		fax_union: '',
		email_union: '',
	});
	const { address, address_detail, address_postcode, phone_union, fax_union, email_union } = unionCreate03Inputs;

  useEffect(() => {
    document.querySelector(".ant-input-disabled").className = document.querySelector(".ant-input-disabled").className.split(" ").slice(0,1).join(" ");
    const script = document.createElement('script');
    script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.body.appendChild(script);
    
    
	}, [unionCreate03Inputs]);

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
        console.log(setUnionCreate03Inputs);
        console.log(unionCreate03Inputs)
        // SetPostCode(postcode);
        // SetAddress(address);
        // console.log(address_postcode, address);
        onClickPostAddress({address_postcode, address});
      }
    }).open();

		
	};
  const onClickPostAddress = ({address_postcode, address}) => {
    console.log("onClickPostAddress",address_postcode, address);
    document.querySelector("input[name=address_postcode]").value = address_postcode;
    document.querySelector("input[name=address]").value = address;
    console.log(unionCreate03Inputs)
  }

	// const onClickPostAdress = async (open = false) => {
	// 	if (open === false && document.querySelector('input[name=postcode]').value !== '') return;

	// 	new window.daum.Postcode({
	// 		oncomplete: (data) => {
	// 			let postcode = data.zonecode;
	// 			let address = data.address;
	// 			setInputs({
	// 				...inputs,
	// 				['address_postcode']: postcode,
	// 				['address']: address,
	// 			});
	// 		},
	// 	}).open();
	// };

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
      <section>
        <div className="row">
          <div className="title">
            <h2>조합 사무소 주소</h2>
          </div>
          <div className="contents">
            <Input name={`address`} size="large" placeholder="주소 (도로명 검색)" readOnly
              onClick={(e) => {
                e.target.blur();
                clickPostAdress();
              }}
            />
          </div>
          <div className="column">
            <Input name={`address_detail`} style={{ width: '60%' }} size="large" placeholder="상세주소 입력" onChange={onChange} />
            <Input name={`address_postcode`} size="large" style={{ width: '40%' }} placeholder="우편번호" readOnly
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
            <Input name={`phone_union_1`} style={{ width: '30%' }} size="large" placeholder="" onChange={onChange} />
            <span>-</span>
            <Input name={`phone_union_2`} style={{ width: '30%' }} size="large" placeholder="" onChange={onChange} />
            <span>-</span>
            <Input name={`phone_union_3`} style={{ width: '30%' }} size="large" placeholder="" onChange={onChange} />
          </div>
        </div>
      </section>
      <section>
        <div className="row">
          <div className="title">
            <h2>조합 사무소 FAX</h2>
          </div>
          <div className="column contents">
            <Input name={`fax_union_1`} style={{ width: '30%' }} size="large" placeholder="" onChange={onChange} />
            <span>-</span>
            <Input name={`fax_union_2`} style={{ width: '30%' }} size="large" placeholder="" onChange={onChange} />
            <span>-</span>
            <Input name={`fax_union_3`} style={{ width: '30%' }} size="large" placeholder="" onChange={onChange} />
          </div>
        </div>
      </section>
      <section>
        <div className="row">
          <div className="title">
            <h2>조합 사무소 E-mail</h2>
          </div>
          <div className="column contents">
            <Input name={`email_union_id`} style={{ width: '30%' }} size="large" placeholder="메일 계정" onChange={onChange} />
            <Select name="email_union_domain" placeholder="메일 도메인 선택" size="large">
							<Select.Option value="@gmail.com">gmail.com</Select.Option>
							<Select.Option value="@naver.com">naver.com</Select.Option>
							<Select.Option value="@hanmail.net">hanmail.net</Select.Option>
							<Select.Option value="">직접 입력</Select.Option>
						</Select>
            
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

  .ant-input[name=address], .ant-input[name=address_postcode] {
    cursor:pointer;
  }

  .ant-input + span, span + .ant-input, .ant-input + .ant-select, .ant-input + .ant-input {
    margin-left: 15px;
  }

  span

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

`

export default PersonalUnionCreate03;
