import React, { useEffect, useState } from "react";
import styled from "styled-components";

import UnionManageCard from "components/common/UnionManageCard";
// import API from "lib/api";

const UnionManageLists = ({ myUnions }) => {
  // useEffect(() => {
  //   console.log(unions.length);

  //   if (unions.length > 0) return;

  //   const fetchUnions = async () => {
  //     const responseCategories = await API.get.all_categories();
  //     const categories = [...responseCategories.data];
  //     const responseUnions = await API.get.unions();
  //     const unionsData = responseUnions.data.map((eachUnion) => {
  //       return {
  //         ...eachUnion,
  //         ["invest_category"]: eachUnion.invest_category,
  //       };
  //     });
  //     if (unions.length === 0) {
  //       setUnions(unionsData);
  //     }

  //     // incoming changes
  //     // const response = await API.get.unions();
  //     // setUnions(response.data);
  //     // console.log(response)
  //   };
  //   fetchUnions();
  // }, []);

  if (myUnions.length === 0) {
    console.log(`unions ${myUnions.length}`);
    return <></>;
  }

  return (
    <>
      {myUnions?.map((union, i) => {
        return (
          <UnionManageCardsCell key={`union-${union.id}`}>
            <UnionManageCard union={union} id={union.id} />
          </UnionManageCardsCell>
        );
      })}
    </>
  );
};

const UnionManageCardsCell = styled.div`
  margin: 0.5rem;
  place-items: center;
  display: flex;
`;

export default UnionManageLists;
