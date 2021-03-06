import React from 'react';
import styled from 'styled-components';

const UnionCard = (props) => {
	const { idx, union, openModal } = props;
	console.log(union)

  const calculateDate = (recruitment_end_date, recruitment_start_date) => {
    const remainDateInteger = (new Date(recruitment_end_date) - new Date(recruitment_start_date))/1000/60/60/24;
    if (remainDateInteger >= 1) {
      return `${Number(remainDateInteger/24)}일 남음`
    } 
    return `${Number(remainDateInteger*24)}시간 남음`
  }

  const calculateMillionWon = (won) => {
    return won/1000000;
  }

  const onClickParticipateButton = () => {
    openModal({idx, info: union});
  }
	return (
		<CardLayout>
      <section className="title">
        <h3>{union.name}</h3>
      </section>
      <section className="contents default-info">
        <div className="row">
          <span>{union?.description}</span>
          <span>조합의 소개가 들어갈 곳 조합의 소개가 들어갈 곳 조합의 소개가 들어갈 곳 조합의 소개가 들어갈 곳 조합의 소개가 들어갈 곳 조합의 소개가 들어갈 곳 조합의 소개가 들어갈 곳</span>
        </div>
        <div className="row">
          <div className="column column-1">
            <span className="grey">투자 분야 </span>
          </div>
          <div className="column column-5">
            <span className="grey"> {union.invest_category} </span>  
          </div>
        </div>
      </section>
      <section className="contents financial-info">
        <div className="row">
          <div className="column column-1">
            <span className="grey">출자 총액</span>
          </div>
          <div className="column column-5">
            <span className="bold">{calculateMillionWon(union.expected_amount)} 백만원</span>  
          </div>
        </div>  
        <div className="row">
          <div className="column column-1">
            <span className="grey">현재 출자액 </span>
          </div>
          <div className="column column-5">
            <span className="bold">이거는 어떻게 계산하지..? </span>  
          </div>
        </div>
        <div className="row">
          <div className="column column-1">
            <span className="grey">최소 출자액</span>
          </div>
          <div className="column column-5">
            <span className="bold">구좌당 {calculateMillionWon(union.amount_per_account)} 백만원 | 최소 {union.min_of_account}구좌</span>
          </div>
        </div>  
        <div className="row">
          <div className="column column-1">
            <span className="grey">모집기간</span>
          </div>
          <div className="column column-5">
            <span className="bold">{calculateDate(union.recruitment_end_date, union.recruitment_start_date)} ({union.recruitment_end_date})</span>  
          </div>
        </div>  
      </section>
			<section className="bottom-button">
        <div className="row center">
          <button className="participate-button unifolio-blue" onClick={onClickParticipateButton}>참여 하기</button>
        </div>
      </section>
		</CardLayout>
	);
};

const CardLayout = styled.div`
	width: 100%;
	height: 100%;
	box-shadow: 0 5px 7px -1px gray;
	padding: 1rem;
	display: grid;

  section.contents {
    margin: 10px;

    &.contents.financial-info {
      border-top: 1px solid #847F7F;
      padding-top: 10px;
    }
  }

  button {
    &.participate-button {
      width: 100%
    }
    &.unifolio-blue {
      color: blue;
    }
  }

  span {
    &.grey {
      color: #847F7F;
    }
    &.bold {
      font-weight: bold;
    }
  }
  
  .row {
    width: 100%;
    
    display: flex;
    &.center {
      justify-content: center;
    }
  }
  
  .column {
    display: flex;
    
    &-1 {
      flex-grow: 1;
      flex-basis: 80px;
    }
    &-5 {
      flex-grow: 5;
      flex-basis: 80px;
    }
  }

  .column + .column {
    margin-left: 10px;
  }

  section + section {
    margin-top: 10px;
  }

`;

export default UnionCard;
