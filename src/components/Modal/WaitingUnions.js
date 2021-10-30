import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import UnionCard from 'components/common/UnionCard';
import API from 'lib/api';

const WaitingUnionsCell = styled.div`
	margin: 0.5rem;
	place-items: center;
	display: flex;
`;

const WaitingUnions = ({ openModal }) => {
	const [unions, setUnions] = useState([]);

  const onOpenModal = (cardObj) => {
		openModal(cardObj);
	};

	useEffect(() => {
    console.log(unions.length)
    
		if (unions.length > 0) return;
    
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
      if (unions.length === 0) {
        setUnions(unionsData);
      }
      
      // incoming changes
      // const response = await API.get.unions();
      // setUnions(response.data);
      // console.log(response)
		};
		fetchUnions();
	}, []);


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
