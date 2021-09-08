import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import UnionCard from 'components/common/UnionCard';
import API from 'lib/api';

const WaitingUnionsCell = styled.div`
	margin: 0.5rem;
	place-items: center;
	display: flex;
`;

const WaitingUnions = (props) => {
	const [unions, setUnions] = useState([]);
  const { openModal } = props;

  const onOpenModal = (cardObj) => {
		openModal(cardObj);
	};

	useEffect(() => {
		
    const fetchUnions = async () => {
      const responseCategories = await API.get.all_categories();
      const categories = [...responseCategories.data];
			const responseUnions = await API.get.unions();
      const unionsData = responseUnions.data.map((eachUnion) => {
        return {
          ...eachUnion,
          ['invest_category']: eachUnion.invest_category
        }
      })
      setUnions(unionsData);
		};
		fetchUnions();
	});


  if (unions.length === 0 ) {
    console.log(`unions ${unions.length}`)
    return <></>;
  }
	return (
		<>
			{unions?.map((union, i) => {
        return (
          <WaitingUnionsCell key={`${i}`}>
            <UnionCard union={union} idx={i+1} openModal={onOpenModal} />
          </WaitingUnionsCell>
        );
      })}
		</>
	);
};

export default WaitingUnions;
