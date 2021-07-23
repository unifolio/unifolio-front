import ManagerDetailInfo from 'components/Union-manage/ManagerDetailInfo';
import UnionDetailInfo from 'components/Union-manage/UnionDetailInfo';
import React from 'react';
import styled from 'styled-components';

const InfoSection = () => {
    return(
        <DetailInfoSection>
            <UnionDetailInfo/>
            <ManagerDetailInfo />
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
