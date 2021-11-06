import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Input, Button, Select } from "antd";

import useFetchCategories from "hooks/useFetchCategories";

const InvestmentHistoryInput = ({ type, count, value, onInvestmentHistoryChange, onInvestmentHistoryDelete }) => {
  const { categories } = useFetchCategories();

  const handleInvestmentHistoryChange = (e) => {
    if (!e.target) {
      // select일 때
      let { value, name } = e;
      if (name.includes("category")) {
        onInvestmentHistoryChange({ count: name.slice(-1), name, value });
      }
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
        <Select
          name={`investment-history-category-${count}`}
          size="large"
          placeholder="투자 분야"
          defaultValue={value?.category?.category}
          onChange={(value) => {
            handleInvestmentHistoryChange({
              name: `investment-history-category-${count}`,
              value: {category: value},
            });
          }}
        >
          {categories.map((categoryData, idx) => {
            return (
              <Select.Option key={`investment-history-select-${idx}`} value={categoryData.category}>
                {categoryData.category}
              </Select.Option>
            );
          })}
        </Select>
        <Input
          className="company"
          name={`investment-history-company-${count}`}
          size="large"
          placeholder="회사명"
          defaultValue={value.company}
          onChange={handleInvestmentHistoryChange}
        />
        <Input
          className="description"
          name={`investment-history-description-${count}`}
          size="large"
          placeholder="설명(수익률 등)"
          defaultValue={value.description}
          onChange={handleInvestmentHistoryChange}
        />
        <Button
          onClick={() => {
            deleteInvestmentHistoryInput(count);
          }}
          style={{ height: "auto" }}
        >
          삭제
        </Button>
      </div>
    </InvestmentHistoryContent>
  );
};

const InvestmentHistoryContent = styled.div`
  margin-bottom: 10px;

  display: flex;
  flex-direction: column;

  .title,
  .contents {
    width: 100%;
  }

  .column {
    display: flex;
  }

  .ant-select + .ant-input,
  .ant-input + .ant-input,
  .ant-input + .ant-btn {
    margin-left: 10px;
  }
  .firm {
    width: 20%;
  }
`;

export default InvestmentHistoryInput;
