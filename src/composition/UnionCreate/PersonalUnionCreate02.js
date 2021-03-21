import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Input, Button, Select } from 'antd';

const PersonalUnionCreate02 = React.memo((props) => {
	const { onClickNext, className } = props;
	const [unionCreate02Inputs, setUnionCreate02Inputs] = useState({
		name: '',
		invest_category_1: '',
		invest_category_2: '',
		invest_category_3: '',
		
    recruitment_start_date: '',
		recruitment_end_date: '',
		expected_amount: null,
		
    amount_per_account: null,
    total_account: null,

    amount_operator_ratio: null,
    amount_operator: null,
    num_of_account_by_operator: null,
    
    amount_lp_ratio: null,
    amount_lp: null,
    num_of_account_by_lp: null,
    min_of_account: null,

    real_period: '',
		extend_year: '',
	});

  // destructured state values
  const { 
    name, invest_category_1, invest_category_2, invest_category_3, 
    recruitment_start_date, recruitment_end_date, expected_amount,
    amount_per_account, total_account,
    amount_operator_ratio, amount_operator, num_of_account_by_operator,
    amount_lp_ratio, amount_lp, num_of_account_by_lp, min_of_account,
    real_period, extend_year 
  } = unionCreate02Inputs;

  useEffect(() => {
    calculate();
  }, [
    unionCreate02Inputs.amount_per_account, unionCreate02Inputs.expected_amount, 
    unionCreate02Inputs.amount_operator_ratio, unionCreate02Inputs.total_account,
    unionCreate02Inputs.amount_lp_ratio,
  ])

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
    console.log(unionCreate02Inputs, e.target.name, e.target.value);
		
	};

  const isNotNull = (state) => {
    return state !== null;
  }

  const calculate = () => {
    const newState = {};
    if (isNotNull(amount_per_account) && isNotNull(expected_amount)) {
      newState["total_account"] = expected_amount/amount_per_account;
    }
    if (isNotNull(amount_operator_ratio) && isNotNull(expected_amount) && isNotNull(total_account)) {
      newState["amount_operator"] = expected_amount * amount_operator_ratio/100;
      newState["num_of_account_by_operator"] = total_account * amount_operator_ratio/100;
      newState["amount_lp_ratio"] = 100 - amount_operator_ratio;
    }
    if (isNotNull(amount_per_account) && isNotNull(amount_lp_ratio) && isNotNull(total_account)){
      newState["amount_lp"] = expected_amount * amount_lp_ratio/100;
      newState["num_of_account_by_lp"] = total_account - num_of_account_by_operator;
    }
    setUnionCreate02Inputs({ ...unionCreate02Inputs, ...newState });
  }

	const layoutRef = useRef();
	const handleNext = (e) => {
		// 데이터 넘김
		onClickNext(unionCreate02Inputs, 2, layoutRef.current);
	};

	return (
		<PersonalUnionCreate02Layout className={className} ref={layoutRef}>
      <Input name={`hidden`} size="large" disabled type={"hidden"}/> {/* 첫번째 disabled input은 스타일을 안먹는 버그가 있음. */}
      <section>
        <div className="row">
          <div className="column">
            <div className="column title">
              <h2> 조합 이름 </h2>
            </div>
            <div className="column contents">
              <Input name={`name`} value={name} size="large" placeholder="조합 이름" onChange={onChange} />
            </div>
          </div>
          <div className="column">
            <div className="column title">
              <h2> 투자 종목 </h2>
            </div>
            <div className="column contents">
              <div className="row">
                <Input name={`invest_category_1`} value={invest_category_1} size="large" placeholder="1종목" onChange={onChange} />
                <Input name={`invest_category_2`} value={invest_category_2} size="large" placeholder="2종목" onChange={onChange} />
                <Input name={`invest_category_3`} value={invest_category_3} size="large" placeholder="3종목" onChange={onChange} />
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
            <Input name={`recruitment_start_date`} value={recruitment_start_date} style={{ width: '30%' }} size="large" placeholder="모집 시작 날짜" onChange={onChange} />
            <span> ~ </span>
            <Input name={`recruitment_end_date`} value={recruitment_end_date} style={{ width: '30%' }} size="large" placeholder="모집 마감 날짜" onChange={onChange} />
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
                <Input name={`expected_amount`} type="number" value= {unionCreate02Inputs.expected_amount} style={{ width: '30%' }} size="large" placeholder="목표 출자금 (최소 1억원 이상)" onChange={onChange} /> 
                <span>만원</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="column title">
          <h2> 출자 1좌별 금액 </h2>
        </div>
        <div className="column contents">
          <div className="row">
            <div className="column amount-contents">
              <div className="row">
                <Input name={`amount_per_account`} type="number" value={unionCreate02Inputs.amount_per_account} style={{ width: '30%' }} size="large" placeholder="목표 출자금 (최소 1억원 이상)" onChange={onChange} /> 
                <span>만원</span>
              </div>
            </div>
            <div className="column amount-contents">
              <div className="row">
                <span>총</span>
                <Input name={`total_account`} value={total_account} size="large" disabled /> 
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
                <Input name={`amount_operator_ratio`} value={amount_operator_ratio} style={{ width: '30%' }} size="large" placeholder="운용사 출자 예정 비율" onChange={onChange} /> 
                <span>%</span>
              </div>
            </div>
            <div className="column amount-contents">
              <div className="row">
                <Input name={`amount_operator`} value={amount_operator} style={{ width: '30%' }} size="large" disabled /> 
                <span>만원</span>
              </div>
            </div>
            <div className="column amount-contents">
              <div className="row">
                <span>총</span>
                <Input name={`num_of_account_by_operator`} value={num_of_account_by_operator} style={{ width: '30%' }} className={"ant-input-lg"} disabled /> 
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
      <section>
        <div className="column title">
          <h2>조합원 출자 금액</h2>
        </div>
        <div className="column contents">
          <div className="row">
            <div className="column amount-contents">
              <div className="row">
                <Input name={`amount_lp_ratio`} value={amount_lp_ratio} style={{ width: '30%' }} size="large" disabled /> 
                <span>%</span>
              </div>
            </div>
            <div className="column amount-contents">
              <div className="row">
                <Input name={`amount_lp`} value={amount_lp} style={{ width: '30%' }} size="large" disabled /> 
                <span>만원</span>
              </div>
            </div>
            <div className="column amount-contents">
              <div className="row">
                <span>총</span>
                <Input name={`num_of_account_by_lp`} value={num_of_account_by_lp} style={{ width: '30%' }} size="large" disabled /> 
                <span>구좌</span>
              </div>
            </div>
            <div className="column amount-contents">
              <div className="row">
                <Input name={`min_of_account`} value={min_of_account} style={{ width: '30%' }} size="large" placeholder={"최소 구좌 갯수"} onChange={onChange}/> 
                <span>구좌</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="column title">
          <h2> 조합 존속기간 </h2>
        </div>
        <div className="column contents">
          <div className="row">
            <div className="column amount-contents">
            <div className="row">
              <Input name={`real_period`} value={real_period} style={{ width: '90%' }} size="large" placeholder="조합 존속 기간" onChange={onChange} />
              <span>년</span>
              </div>
            </div>
            <div className="column amount-contents">
            <div className="row">
              <Input name={`extend_year`} value={extend_year} style={{ width: '90%' }} size="large" placeholder="존속기간 만료시 최대 연장기간" onChange={onChange} />
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
});

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

  span {
    margin-left: 10px;
    margin-right: 10px;

    display:flex;
    align-items: center;
    flex-shrink: 0; // == flex-basis: content-size 
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
