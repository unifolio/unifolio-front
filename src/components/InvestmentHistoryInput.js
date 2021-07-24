import React, { useEffect, useState } from 'react';

import { Input, Button, Select } from 'antd';
import styled from 'styled-components';

import API from 'lib/api';

const InvestmentHistoryInput = ({ type, count, onInvestmentHistoryChange, onInvestmentHistoryDelete }) => {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategory = await API.get.all_categories();
      console.log(fetchedCategory.data);
      setCategories(fetchedCategory.data.data);
    }
    fetchCategories();  
  }, []);
  
  const handleInvestmentHistoryChange = (e) => {
    
    if (!e.target) { // select일 때
      let { value, name } = e;
      onInvestmentHistoryChange({ value, name, count: name.slice(-1) });
      return;
    }
    
		let { value, name } = e.target;
		onInvestmentHistoryChange({ value, name, count: name.slice(-1) });
	};

	const deleteInvestmentHistoryInput = (count) => {
		onInvestmentHistoryDelete(count);
	};

  if (categories.length === 0) return <></>;

  return (
    <InvestmentHistoryContent className={`investment-history-${count} row`}>
      <div className="column contents">
        <Select name={`investment-history-category-${count}`} size="large" placeholder="투자 분야" 
          onChange={(value) => {
            handleInvestmentHistoryChange({
              name: `investment-history-category-${count}`,
              value: value,
            })}}
        >
          {categories.map((categoryObject, idx) => {
            return (
              <Select.Option key={`select-${idx}`} value={categoryObject.id}>
                {categoryObject.category}
              </Select.Option>
            );
          })}
          
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