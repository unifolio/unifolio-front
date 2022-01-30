import UnionDetailInfo from 'components/Union-manage/UnionDetailInfo';
import UserDetailInfo from 'components/Union-manage/UserDetailInfo';
import React from 'react';
import styled from 'styled-components';

const InfoSection = ({ unionData, receiverData }) => {
    return(
        <DetailInfoSection>
            <UnionDetailInfo unionData={unionData} />
            <UserDetailInfo receiverData={receiverData}/>
        </DetailInfoSection>

    )
}
export default InfoSection;
const DetailInfoSection = styled.section`
    display: flex;
    justify-content: space-between;
    @media screen and (max-width:902px){
        flex-direction: column;
    }
`;
