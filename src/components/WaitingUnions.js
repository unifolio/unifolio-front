import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import UnionCard from 'components/common/UnionCard';
import API from 'lib/api';

const WaitingUnionsCell = styled.div`
	margin: 0.5rem;
	place-items: center;
	display: flex;
`;

const WaitingUnions = () => {
	const [unions, setUnions] = useState([]);
	useEffect(() => {
		
    const fetchUnions = async () => {
			const response = await API.get.unions();
      setUnions(response.data);
		};
		fetchUnions();

    if (unions.length === 0 ) {
      return;
    }
	}, []);

	return (
		<>
			{unions.map((union, i) => {
        return (
          <WaitingUnionsCell key={`${i}`}>
            <UnionCard union={union} idx={i+1} />
          </WaitingUnionsCell>
        );
      })}
		</>
	);
};

export default WaitingUnions;
