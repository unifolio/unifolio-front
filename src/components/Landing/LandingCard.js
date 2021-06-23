import styled from 'styled-components';
import React from 'react';
import JokeImage from '../../assets/images/ping.png'

const Card = styled.section`
    max-width: 388px;
    width: 100%;
    height: 210px;
    background-color:white;
    color:black;
    border-radius: 5px;
    box-shadow: 0 0 3px 1px rgba(0,0,0,0.3);
    padding:30px;
    display:flex;
    justify-content: space-between;
    align-items:center;
    @media (max-width: 1140px) {
    grid-template-columns: 1fr 1fr;
	}
    @media (max-width: 1040px) {
        padding:10px;
        height: 150px;
	}
    /* @media (max-width: 690px) {
        padding:10px;
	} */
`
const Image = styled.img`
    width:  100px;
    height: 100px;
    border-radius: 50%;
    @media (max-width: 1140px) {
    grid-template-columns: 1fr 1fr;
	}
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
    @media (max-width: 1040px) {
        font-size: 18px;
        line-height: 24px;
	}
    @media (max-width: 915px) {
        font-size: 24px;
        line-height: 32px;
	}
    @media (max-width: 615px) {
        font-size: 18px;
        line-height: 24px;
	}
`;

const Count = styled(Title)`
    font-size: 70px;
    line-height: 70px;
    font-style: italic;
    font-weight: 300;
    text-align: center;
    @media (max-width: 1040px) {
        font-size: 50px;
        line-height: 50px;
	}
    @media (max-width: 915px) {
        font-size: 70px;
        line-height: 70px;
	}
    @media (max-width: 615px) {
        font-size: 50px;
        line-height: 50px;
	}
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