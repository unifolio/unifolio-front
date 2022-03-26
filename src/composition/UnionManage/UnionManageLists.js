import React from "react";
import styled from "styled-components";

import UnionManageCard from "components/common/UnionManageCard";

const UnionManageLists = ({ myUnions }) => {
  if (myUnions?.length === 0 || !myUnions) {
    console.log(`unions ${myUnions?.length}`);
    return <div>해당 상태의 조합이 존재하지 않습니다</div>;
  }

  return (
    <>
      {myUnions?.map((union, i) => {
        return (
          <UnionCardsCell key={`union-${union.id}`}>
            <UnionManageCard union={union} id={union.id} />
          </UnionCardsCell>
        );
      })}
    </>
  );
};

const UnionCardsCell = styled.div`
  margin: 0.5rem;
  place-items: center;
  display: flex;
`;

export default UnionManageLists;
