import React from 'react'
import styled from 'styled-components';

import * as Icons from 'components/common/Icons';
import UnsettedButton from 'components/common/UnsettedButton';

import palette from 'lib/styles/palette';

const InputAddHeader = ({target, handleClickActive}) => {
  return (
    <>
      <AdditionalInfoSubTitle> {target} 입력 </AdditionalInfoSubTitle>
      <AdditionalInfoButtons>
        <ActiveButton onClick={ handleClickActive }> 
          <Icons.ScrewIcon /> 추가하기
        </ActiveButton>
      </AdditionalInfoButtons>
    </>
  )
}

const AdditionalInfoSubTitle = styled.span`
  font-size: var(--fontSize20);
  font-weight: bold;
`;

const AdditionalInfoButtons = styled.div`
  display: flex;

  button + button {
    margin-left: 15px;
  }
`;

const Button = styled(UnsettedButton)`
  font-size: 16px;
  
  display: flex;
`;
const ActiveButton = styled(Button)`
  color: ${palette.unifolioBlue};
`

export default InputAddHeader;