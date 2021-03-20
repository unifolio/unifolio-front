import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Input, Button, Select } from 'antd';

const PersonalUnionCreate02 = (props) => {
	const { onClickNext, className } = props;
	const [unionCreate02Inputs, setUnionCreate02Inputs] = useState({
		union_name: '',
		invest_category_1: '',
		invest_category_2: '',
		invest_category_3: '',
		num_of_recruit: '',
		recruitment_start_date: '',
		recruitment_end_date: '',
		expected_amount: '',
		investment_ratio: '',
		investment_amount: '',
		amount_per_account: '',
		real_period: '',
		extend_year: '',
	});

	const { union_name, invest_category_1, invest_category_2, invest_category_3, num_of_recruit, recruitment_start_date, recruitment_end_date, expected_amount, investment_ratio, investment_amount, amount_per_account, real_period, extend_year } = unionCreate02Inputs;
	const onChange = (e) => {
    
    if (!e.target) { // select일 때
      let { value, name } = e;
      setUnionCreate02Inputs({ 
        ...unionCreate02Inputs,
        [name]: value
      });
      return;
    }

		setUnionCreate02Inputs({
			...unionCreate02Inputs,
			[e.target.name]: e.target.value,
		});
		console.log(unionCreate02Inputs);
	};

	const layoutRef = useRef();
	const handleNext = (e) => {
		// 데이터 넘김
		onClickNext(unionCreate02Inputs, 2, layoutRef.current);
	};

	return (
		<PersonalUnionCreate02Layout className={className} ref={layoutRef}>
      <section>
        <div className="row">
          <div className="column">
            <div className="column title">
              <h2> 조합 이름 </h2>
            </div>
            <div className="column contents">
              <Input name={`union_name`} size="large" placeholder="조합 이름" onChange={onChange} />
            </div>
          </div>
          <div className="column">
            <div className="column title">
              <h2> 투자 종목 </h2>
            </div>
            <div className="column contents">
              <div className="row">
                <Select name={`invest_category_1`} size="large" placeholder="1종목" 
                  onChange={(value) => {onChange({
                    name: `invest_category_1`,
                    value: value,
                  })}}
                >
                  <Select.Option value="IT">IT</Select.Option>
                  <Select.Option value="Bio">바이오</Select.Option>
                  <Select.Option value="Food">식품</Select.Option>
                </Select>
                <Select name={`invest_category_2`} size="large" placeholder="2종목" 
                  onChange={(value) => {onChange({
                    name: `invest_category_2`,
                    value: value,
                  })}}
                >
                  <Select.Option value="IT">IT</Select.Option>
                  <Select.Option value="Bio">바이오</Select.Option>
                  <Select.Option value="Food">식품</Select.Option>
                </Select>
                <Select name={`invest_category_3`} size="large" placeholder="3종목" 
                  onChange={(value) => {onChange({
                    name: `invest_category_3`,
                    value: value,
                  })}}
                >
                  <Select.Option value="IT">IT</Select.Option>
                  <Select.Option value="Bio">바이오</Select.Option>
                  <Select.Option value="Food">식품</Select.Option>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="column title">
					<h2> 모집 기간 </h2>
        </div>
        <div className="column contents">
          <div className="row">
            <Input name={`recruitment_start_date`} style={{ width: '30%' }} size="default" placeholder="모집 시작 날짜" onChange={onChange} />
            <span>~</span>
            <Input name={`recruitment_end_date`} style={{ width: '30%' }} size="default" placeholder="모집 마감 날짜" onChange={onChange} />
          </div>     
				</div>
      </section>
      <section>
        <div className="column title">
          <h2> 출자 금액 </h2>
        </div>
        <div className="column contents">
          <div className="row">
            <div className="column amount-contents">
            <div className="row">
              <Input name={`expected_amount`} style={{ width: '50%' }} size="large" placeholder="목표 출자금 (최소 1억원 이상)" onChange={onChange} /> 
              <span>만원</span>
              </div>
            </div>
            <div className="column amount-contents">
            <div className="row">
              <span>총</span>
              <Input name={`total_account`} disabled style={{ width: '50%' }} size="large" placeholder="" onChange={onChange} /> 
              <span>구좌</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="column title">
          <h2> 운용사 출자 금액 </h2>
        </div>
        <div className="column contents">
          <div className="row">
            <div className="column amount-contents">
              <div className="row">
              <Input name={`investment_ratio`} style={{ width: '30%' }} size="large" placeholder="운용사 출자 예정 비율" onChange={onChange} /> 
              <span>%</span>
              </div>
            </div>
            <div className="column amount-contents">
            <div className="row">
              <Input name={`amount_operator`} style={{ width: '30%' }} size="large" disabled onChange={onChange} /> 
              <span>만원</span>
              </div>
            </div>
            <div className="column amount-contents">
            <div className="row">
              <span>총</span>
              <Input name={`num_of_account_by_operator`} style={{ width: '30%' }} size="large" disabled onChange={onChange} /> 
              <span>구좌</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="colmun amount-contents--label">
              <label>
                * 업무집행조합원의 경우 필수적으로 출자 총액의 5% 이상 출자해야합니다.
              </label>
            </div>
          </div>
        </div>
      </section>
      {/* <section>
        <div className="column title">
          <h2>조합원 출자 1좌별 금액</h2>
        </div>
        <div className="column contents">
          <div className="group left-50">
            <div className="group-inner-column">
            <Input name={`amount_per_account`} style={{ width: '90%' }} size="large" placeholder="조합원 출자 필요 예상 총액" onChange={onChange} /> 만원
            </div>
            <div className="group-inner-column">
            <Input name={`amount_per_account`} style={{ width: '90%' }} size="large" placeholder="출자 1좌의 금액(최소 100만원 이상)" onChange={onChange} /> 만원
            </div>
          </div>
        </div>
      </section>
       */}
      <section>
        <div className="column title">
          <h2> 조합 존속기간 </h2>
        </div>
        <div className="column contents">
          <div className="row">
            <div className="column amount-contents">
            <div className="row">
              <Input name={`real_period`} style={{ width: '90%' }} size="large" placeholder="조합 존속 기간" onChange={onChange} />
              <span>년</span>
              </div>
            </div>
            <div className="column amount-contents">
            <div className="row">
              <Input name={`extend_year`} style={{ width: '90%' }} size="large" placeholder="존속기간 만료시 최대 연장기간" onChange={onChange} />
              <span>년</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Button onClick={handleNext} size="large"> 다음 단계 진행하기 </Button>
      </section>
    </PersonalUnionCreate02Layout>
	);
};

const PersonalUnionCreate02Layout = styled.div`
  width: 100%;
	margin-bottom: 10px;

	display: flex;
	flex-direction: column;
  
  section + section {
    margin-top: 50px;
  }

  h2 {
    font-size: 20px !important;
  }

  .column {
    display: flex;
    flex-direction:column;
    width: 100%;

    &.title {
      display: flex;
		  flex-direction: column;  
    }

    &.contents {
      display: flex;
      flex-grow: 7;
      flex-direction: column;
    }
  }
  
  .row > .column + .column {
    margin-left: 15px;
  }
  /* .column.title {
    display: flex;
		flex-direction: column;
    /* flex-basis:100px; */
  // } 
  

  .row {
    width: 100%;
    display: flex;
  }
	.column.contents {
		/* display: flex;
    flex-grow: 7;
		flex-direction: column; */
    
    .ant-input {
      margin-right: 10px;
      
      display:flex;
      flex-grow:1;
      
    }

    .ant-select {
      width: 120px;
      margin-right: 10px;

      display:flex;
      flex-shrink: 0;
    }
    
    .amount-contents + .amount-contents {
      margin-left: 15px;
    }
  }
`;

export default PersonalUnionCreate02;
