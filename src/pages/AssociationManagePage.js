import Responsive from 'components/common/Responsive';
import React from 'react';
import UnionInfo from "components/Union-manage/UnionInfo";
import ParticipationList from 'components/Union-manage/participation/ParticipationList';

const AssociationManagePage = () => {
  return (
    <Responsive level={2}>
      <UnionInfo/>
      <ParticipationList title={"조합 참여 미확정자"} object={"대화상대"}/>
      <ParticipationList title={"조합 참여 확정"} object={"확정자"}/>
    </Responsive>
  );
}

export default AssociationManagePage;
