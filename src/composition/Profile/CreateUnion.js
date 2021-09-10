import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import CreateUnionSelectCard from 'components/common/CreateUnionSelectCard';

const CreateUnion = () => {
	return (
    <CardArea>
      <CreateUnionSelectCard type={"general"} />
      <CreateUnionSelectCard type={"business"} />
    </CardArea>
	);
};

const CardArea = styled.div`
  margin-top: 111px;
  font-size: var(--fontSize18);

  display: flex; 
`
export default CreateUnion;
