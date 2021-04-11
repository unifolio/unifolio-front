import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import CancelImage from '../../assets/images/cancel.png';

const MoreInfoPerson = ({ $dom, idx, toggleModal }) => {
	const [modalIdx, setModalIdx] = useState(null);

  const isLogin = () => {
    const accessToken = localStorage.getItem('unifolioAccess');
      if (!accessToken) return false;
      return true;
  }
  
  useEffect(() => {
    
    if (idx !== modalIdx) setModalIdx(idx);
    if ($dom && !modalIdx) {
      const $innerCardSection = document.querySelector(".inner-card");
      $innerCardSection.innerHTML = "";
      $innerCardSection.append($dom);
    }
  }, [$dom])
  // if ($dom === null) return null;
	return (
		<WaitingInfoPosition>
			<WaitingInfoBlock>
        <Header>
          <CancelButton onClick={ () => toggleModal(false) }>
            <img src={CancelImage} alt="닫기"/>
          </CancelButton>
          <InfoSection>
            <HeadBigFont>더 많은 정보를 보고 싶다면?</HeadBigFont>
          </InfoSection>
        </Header>
        <InfoColumn>
          <InfoSection className="inner-card"></InfoSection>
          <InfoSection>
            {
              isLogin() 
              ? (<InfoContents>
                  <BigFont> 등록하신 경력은 마스킹되어 일부만 조합을 만드는 운용사에게 공개됩니다. </BigFont>
                  <Button onClick={() => {window.location.href="/profile"}}> 내 경력 등록하기 </Button>
                </InfoContents>)
              : (<InfoContents style={{justifyContent: 'flex-start' }}>
                  <BigFont> 조회를 위해 먼저 로그인 해주세요 </BigFont>
                  <Button onClick={() => {window.location.href="/signin"}} > 로그인 하기 </Button>
                </InfoContents>)
            }
          </InfoSection>
        </InfoColumn>
				
			</WaitingInfoBlock>
		</WaitingInfoPosition>
	);
};

const WaitingInfoPosition = styled.section`
	width:100%;
	height:100%;
	display: flex;
	
  min-height: inherit;
`;

const WaitingInfoBlock = styled.div`
	width:100%;
	height:100%;
  min-height: inherit;
	padding: 2rem 5rem;
	position: relative;
  
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
	
  @media screen and (max-width:545px){
		padding: 2rem 2rem;
	}
`;

const Header = styled.div``;

const Button = styled.button`
	width:100%;
	height: 2.5rem;
	font-size: 1rem;
	color: rgba(60, 47, 242, 1);
	border: 1px solid rgba(60, 47, 242, 1);
  background-color:rgba(255,255,255,0);
	outline: none;
	cursor:pointer;
	&:hover{
		background-color:rgba(60, 47, 242, 1);
		color: white;
	}
`;

const CancelButton = styled.button`
	
	border:0;
	outline:0;
	background-color: rgba(225,255,255,0);
	cursor: pointer;
	position: absolute;
	top:1rem;
	right:1rem;
	@media screen and (max-width:545px){
		top:0.5rem;
		right:0.5rem;
	}
`;
const InfoColumn = styled.div`
  display:flex;
  flex-direction: row;

  & > section + section {
    margin-left: 20px;  
  }
`;
const InfoSection = styled.section`
	display:flex;
	align-items:flex-start;
  
  &.inner-card {
    min-width: 297px;
  }
`;
const InfoContents = styled.div`
  width: 100%;
  height: 100%;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  span {
    display: flex;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  span + button { margin-top: 20px }
  
`;
const Category = styled.span`
	display:block;
	min-width:85px;
	color:rgba(60, 47, 242, 1);
	font-size:0.75rem;
	font-weight:700;
	@media screen and (max-width:450px){
		min-width:65px;
	}
`;

const BigFont = styled.span`
	display:block;
	font-size:1.25rem;
	
`;

const Tag = styled.span`
	color:rgba(60, 47, 242, 1);
	font-size:0.75rem;
	font-weight:700;
	border: 1px solid rgba(60, 47, 242, 1);
	border-radius:30px;
	padding: 1px 10px;
	text-align:center;
	margin-right: 0.75rem;
	@media screen and (max-width:450px){
		font-size:0.5rem;
		margin-right: 0.5rem;

	}
`;

const HeadBigFont = styled(BigFont)`
  color:rgba(60, 47, 242, 1);
`

export default MoreInfoPerson;