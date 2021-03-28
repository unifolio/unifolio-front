import React, { useState, useCallback } from 'react';
import { Input, Button, Select } from 'antd';
import styled from 'styled-components';

const InvestmentHistoryInput = (props) => {
  const { type, count, onInvestmentHistoryChange, onInvestmentHistoryDelete } = props;

  const handleInvestmentHistoryChange = (e) => {
    if (!e.target) { // select일 때
      let { value, name } = e;
      onInvestmentHistoryChange({ value, name, idx: name.slice(-1) });
      return;
    }
    
		let { value, name } = e.target;
		onInvestmentHistoryChange({ value, name,  idx: name.slice(-1) });
	};

	const deleteInvestmentHistoryInput = (count) => {
		let target = document.querySelector(`.investment-history-${count}`);
		target.parentNode.removeChild(target);
		onInvestmentHistoryDelete(count);
	};

  return (
    <InvestmentHistoryContent className={`investment-history-${count} row`}>
      <div className="column contents">
        <Select name={`investment-history-category-${count}`} size="large" placeholder="투자 분야" 
          onChange={(value) => {handleInvestmentHistoryChange({
            name: `investment-history-category-${count}`,
            value: value,
          })}}
        >
          {/* , , , , , , , , 미디어, 서비스, 연구/설계, 전문/특수, 교육/상담/컨설팅, 공무원/공공/비영리, 생산/품질/제조, 기타사무 */}
          <Select.Option value="인사/총무/노무">인사/총무/노무</Select.Option>
          <Select.Option value="마케팅/MD">마케팅/MD</Select.Option>
          <Select.Option value="홍보/CSR">홍보/CSR</Select.Option>
          <Select.Option value="영업/영업관리"> 영업/영업관리 </Select.Option>
          <Select.Option value="회계/재무/금융"> 회계/재무/금융 </Select.Option>
          <Select.Option value="해외/기술영업"> 해외/기술영업 </Select.Option>
          <Select.Option value="유통/무역/구매"> 유통/무역/구매 </Select.Option>
          <Select.Option value="전략/기획"> 전략/기획 </Select.Option>
          <Select.Option value="IT개발"> IT개발 </Select.Option>
          <Select.Option value="서비스 기획/UI, UX등"> 서비스 기획/UI, UX등 </Select.Option>
          <Select.Option value="디자인/예술"> 디자인/예술 </Select.Option>
          
        </Select>
        <Input className="firm" name={`investment-history-firm-${count}`} size="large" placeholder="회사명" onChange={handleInvestmentHistoryChange} />
        <Input className="description" name={`investment-history-description-${count}`} size="large" placeholder="설명(수익률 등)" onChange={handleInvestmentHistoryChange} />
        <Button
          onClick={() => { deleteInvestmentHistoryInput(count); }}
          style={{ height: 'auto' }}
        >
          삭제
        </Button>
      </div>
    </InvestmentHistoryContent>
  );
}

const InvestmentHistoryContent = styled.div`
	margin-bottom: 10px;

	display: flex;
	flex-direction: column;

  .title, .contents {
    width: 100%;
  }

  .column {
    display: flex;
  }
  
  .ant-select + .ant-input, .ant-input + .ant-input, .ant-input + .ant-btn {
    margin-left: 10px;
  }
  .firm {
    width: 20%;
  }
`;



export default InvestmentHistoryInput;