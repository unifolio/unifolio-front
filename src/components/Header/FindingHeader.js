import React from 'react';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Responsive from 'components/common/Responsive.js';

import palette from 'lib/styles/palette.js';

const FindingHeader = ({ history, current }) => {
  const handleClickHeaderItem = (value) => {
    history.push(`/finding?mode=${value}`);
  };

  return (
    <FindingHeaderPosition>
      <FindingHeaderLayout>
        <HeaderItem
          onClick={() => handleClickHeaderItem('waiting-people')}
          current={current}
          value={'waiting-people'}
        >
          출자 대기중인 출자자
        </HeaderItem>
        <HeaderItem
          onClick={() => handleClickHeaderItem('waiting-unions')}
          current={current}
          value={'waiting-unions'}
        >
          결성 대기중인 개인투자조합
        </HeaderItem>
      </FindingHeaderLayout>
    </FindingHeaderPosition>
  );
};

const FindingHeaderPosition = styled(Responsive)`
  position: relative;
  height: 4rem;
  box-shadow: 0 4px 4px -4px gray;
  z-index: 2;
`;

const FindingHeaderLayout = styled.div`
  height: 100%;
  max-width: 1440px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 1440px) {
    width: 100%;
  }
`;

const HeaderItem = styled.div`
  width: 80%;
  height: 100%;
  color: grey;
  font-size: 1.3rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ current, value }) =>
    current === value &&
    css`
      box-shadow: 0 4px 2px -2px ${palette.blue[0]};
      color: ${palette.blue[0]};
    `}
`;

export default withRouter(FindingHeader);
