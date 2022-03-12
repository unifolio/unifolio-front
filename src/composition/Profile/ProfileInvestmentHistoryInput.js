import React from "react";
import styled from "styled-components";

import InvestmentHistoryInput from "components/InvestmentHistoryInput";

const ProfileInvestmentHistoryInput = ({
  investmentHistoryInputs,
  onInvestmentHistoryChange,
  onInvestmentHistoryDelete,
}) => {
  return (
    <InvestmentHistorySection>
      {investmentHistoryInputs.map((input) => (
        <InvestmentHistoryInput
          key={`investment-history-${input.count}`}
          type={input.type}
          count={input.count}
          value={input.info}
          onInvestmentHistoryChange={onInvestmentHistoryChange}
          onInvestmentHistoryDelete={onInvestmentHistoryDelete}
        />
      ))}
    </InvestmentHistorySection>
  );
};

const InvestmentHistorySection = styled.section``;

export default ProfileInvestmentHistoryInput;
