import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Input, Button, Table, Space } from 'antd';

const BusinessUnionCreate05 = ({ user, unionCreateInputData, onClickNext, onClickBack }) => {
  const [rows, setRows] = useState([{key: '1'}]);
	const { TextArea } = Input;

  const [formData, setFormData] = useState({
		recruitment_plan: '',
    annual_invest_amount: '',
    annual_recovery_amount: '',

    management_remuneration_plan: '',

    num_of_general_select: 0,
    ratio_of_general_dismiss: 0,
    num_of_inv_report: 0,
    exceed_profit: 0,
    target_profit: 0,
    
    invest_year: {},
    recovery_year: {},

    invest_year_total: 0,
    recovery_year_total: 0,

    min_of_amount: 0,
	});
  const {
    recruitment_plan, invest_year, recovery_year, management_remuneration_plan, invest_year_total, recovery_year_total 
  } = formData;
	
  useEffect(() => {

		document.querySelector('.ant-pagination').style.display = 'none';

    const initialRows = [
      { key: '1', 회차: '1차 연도' },
      { key: '2', 회차: '2차 연도' },
      { key: '3', 회차: '3차 연도' },
      { key: '4', 회차: '4차 연도' },
      { key: '5', 회차: '총합' },
    ];
    setRows(initialRows);

    const investYearField = formData.invest_year;
    const recoveryYearField = formData.recovery_year;
    initialRows.forEach((row, index) => {
      if (index === initialRows.length - 1) { return }
      if (index !== 0) recoveryYearField[row.key] = "";
      investYearField[row.key] = "";
    });

    setFormData({
      ...formData,
      ["invest_year"]: investYearField,
      ["recovery_year"]: recoveryYearField
    });

	}, []);

	const columns = [
		{ title: '회차', dataIndex: '회차', key: '회차' },
		{ title: '투자', dataIndex: '투자', key: '투자', 
      render: (text, record, index) => {
        if (record["회차"] === "총합")
          return <Input disabled value={invest_year_total}/> ;
        return <Input type={"number"} name={`invest_year_${record.key}`} value={invest_year[record.key]} onChange={onChangeInvestFieldInput} />;
      }
    },
		{ title: '회수', dataIndex: '회수', key: '회수', 
    render: (text, record, index) => {
      if (index === 0) 
        return;
      else if (record["회차"] === "총합")
        return <Input disabled value={recovery_year_total}/> ;
      // else if (index === )
      return <Input type={"number"} name={`recovery_year_${record.key}`} value={recovery_year[record.key]} onChange={onChangeRecoverFieldInput}  /> ;
      }
    },
	];

  const onRowAddButtonClick = () => {
    const rowsData = rows.slice(0, rows.length-1);
    const newRow = { key: rowsData.length+1, 회차: `${rowsData.length+1}차 연도`};
    const totalData = { key: rowsData.length+2, 회차: `총합`};
    
    const newRows = [...rowsData, newRow, totalData];
    setRows([...newRows]);
  }

  const onChangeInvestFieldInput = ({target}) => {
    const target_round = target.name.split("_").pop();

    const investYearFields = formData.invest_year;
    investYearFields[target_round] = target.value;
    
    let investYearTotal = 0;
    for (const eachYear in investYearFields) {
      investYearTotal += Number(investYearFields[eachYear]);
    }
    
    setFormData({
      ...formData,
      ["invest_year"]: { ...investYearFields },
      ["invest_year_total"]: investYearTotal
    });
  }
  
  const onChangeRecoverFieldInput = ({target}) => {
    const target_round = target.name.split("_").pop();

    const recoveryYearFields = formData.recovery_year;
    recoveryYearFields[target_round] = target.value;
    
    let recoveryYearTotal = 0;
    for (const eachYear in recoveryYearFields) {
      recoveryYearTotal += Number(recoveryYearFields[eachYear]);
    }

    setFormData({
      ...formData,
      ["recovery_year"]: { ...recoveryYearFields },
      ["recovery_year_total"]: recoveryYearTotal
    });
  }

  const onChangeInput = ({target}) => {
		setFormData({
			...formData,
			[target.name]: target.value,
		});
		console.log(formData);
	};
  
  const handleInputChange = ({name, value}) => {
    setFormData({...formData, [name]: value })
  }

  const handleNext = () => {
    onClickNext({
      ...formData,
      ["annual_invest_amount"]: JSON.stringify(formData.invest_year),
      ["annual_recovery_amount"]: JSON.stringify(formData.recovery_year)
    }, 5);
	};

  const handlePrev = () => {
    onClickBack(4)
  }

	return (
		<BusinessUnionCreate05Layout>
      <section>
        <div className="row">
          <div className="title">
            <h2> 사모 방식에 의한 조합원 모집 계획 </h2>
          </div>
          <div className="contents">
            <TextArea name={"recruitment_plan"} onChange={onChangeInput} value={recruitment_plan} rows={4} />
          </div>
        </div>
      </section>
      <section>
        <div className="row">
          <div className="column">
            <div className="title">
              <h2> 연도별 투자 및 회수 예정 금액 서술 </h2>
            </div>
            <Button onClick={onRowAddButtonClick} size="large"> 연도 추가하기 </Button>
          </div>
          <div className="contents">
            <Table columns={columns} dataSource={rows} />
          </div>
        </div>
      </section>
      <section>
        <div className="row">
          <div className="title">
            <h2> 관리 보수 지급 및 시기 서술 </h2>
          </div>
          <div className="contents">
            <TextArea 
              name={"management_remuneration_plan"} 
              placeholder="관리보수 지급 시기(연초, 연말, 매월, 매분기, 매반기 등), 보수 지급 규모 등 입력" 
              rows={4} 
              value={management_remuneration_plan} 
              onChange={(e) => handleInputChange({name: "management_remuneration_plan", value:e.target.value})} 
            />
          </div>
        </div>
      </section>
      <section>
        <div className="row">
          <div className="title">
            <h2> 추가 정보 기재</h2>
          </div>
          <div className="contents">
            1. 투자 대상 기업 선정시 운영위원회에서 일반조합원은 
              <Input name={`num_of_general_select`} type={"number"} style={{ width: '10%' }} size="small" 
                onChange={(e) => handleInputChange({name: "num_of_general_select", value: Number(e.target.value)})}
              /> 
              인 이상 구성 <br />
						2. 조합 해산 시 자금 분배 절차를 위해 전체 조합원의 
              <Input name={`ratio_of_general_dismiss`} type={"number"} style={{ width: '10%' }} size="small" 
                onChange={(e) => handleInputChange({name: "ratio_of_general_dismiss", value: Number(e.target.value)})}
              /> 
              % 이상 참석 <br />
						3. 전체 조합원 대상 연 
              <Input name={`num_of_inv_report`} type={"number"} style={{ width: '10%' }} size="small" 
                onChange={(e) => handleInputChange({name: "num_of_inv_report", value: Number(e.target.value)})}
              /> 
              회 이상의 투자보고회를 개최하고 투자 보고서 작성 <br />
						4. 목표 수익률 
              <Input name={`exceed_profit`} type={"number"} style={{ width: '10%' }} size="small" 
                onChange={(e) => handleInputChange({name: "exceed_profit", value: Number(e.target.value)})}
              /> 
              % 이상이면 초과 수익의 
              <Input name={`target_profit`} style={{ width: '10%' }} size="small" 
                onChange={(e) => handleInputChange({name: "target_profit", value: Number(e.target.value)})}
              />
              % 를 업무집행조합원(GP)에게 지급 <br />
          </div>
        </div>
      </section>
      <AdditionalInfoRow style={{ alignItems: "center" }}>
        <NextButton onClick={handleNext}>임시 저장 후 다음 단계 진행하기</NextButton><br />
        <NextButton onClick={handlePrev}>이전 단계로 돌아가기</NextButton>
      </AdditionalInfoRow>
		</BusinessUnionCreate05Layout>
	);
};

const BusinessUnionCreate05Layout = styled.div`
  section + section {
    margin-top: 50px;
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

  span {
    margin-left: 10px;
    margin-right: 10px;

    display:flex;
    align-items: center;
    flex-shrink: 0; // == flex-basis: content-size 
  }
`;

const AdditionalInfoRow = styled.div`
  display: flex;
  flex-direction: column;
  
  & + & {
    margin-top: 24px;
  } 
`;

const NextButton = styled.button`
  width: 50%;
  height: 3rem;
  border: none;
  padding: 0 1rem;
`

export default BusinessUnionCreate05;