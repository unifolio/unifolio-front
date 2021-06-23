import styled from 'styled-components';
import React from 'react';
import JokeImage from '../../assets/images/ping.png'

const Card = styled.section`
    max-width: 388px;
    width: 100%;
    height: 211px;
    background-color:white;
    color:black;
    border-radius: 5px;
    box-shadow: 0 0 3px 1px rgba(0,0,0,0.3);
    padding:30px;
    display:flex;
    justify-content: space-between;
    align-items:center;
    @media (max-width: 690px) {
        padding:10px;
	}
`
const Image = styled.img`
    width:  134px;
    height: 134px;
    border-radius: 50%;
	/* @media (max-width: 1136px) {
		display:none;
	} */
`;
const RightSection = styled.div`
    display : flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const Title = styled.span`
    display:flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    line-height: 32px;
    font-weight: 500;
    text-align: center;
    word-break:keep-all;
    min-width:170px;
    /* @media (max-width: 610px) {
        min-width:0px;
	} */
`;

const Count = styled(Title)`
    font-size: 70px;
    line-height: 70px;
    font-style: italic;
    font-weight: 300;
    text-align: center;

`;

const LandingCard = ({title, number}) => {
    return(
    <Card>
        <Image src={JokeImage} alt="대충 넣어놓은 이미지" />
        <RightSection>
            <Title>{title}</Title>
            <Count>{number}</Count>
        </RightSection>
    </Card>)
}

export default LandingCard;