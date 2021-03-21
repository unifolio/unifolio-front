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
          <Select.Option value="attending">재학</Select.Option>
          <Select.Option value="graduate">졸업</Select.Option>
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