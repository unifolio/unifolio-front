import React from 'react';
import styled from 'styled-components';

const filters = {
  "최대 출자 가능액": { 
    "type": "radio", 
    "name":"max_amount_of_possible_investment", 
    "value": ["5백만원 미만", "5백만원 ~ 1천만원 미만", "1천만원 이상"]
  },
  "경력 분야": {
    "type": "checkbox", 
    "name":"career_category", 
    "value": ["자동차", "유통", "커머스", "바이오", "엔터테인먼트"]
  }, 
  "조합 상태": {
    "type": "radio", 
    "name":"association_status", 
    "value": ["결성이 임박한 조합", "유니폴리오 추천 조합"]
  },
  "투자 분야": {
    "type": "checkbox", 
    "name":"investment_category", 
    "value": ["자동차", "유통", "커머스", "바이오", "엔터테인먼트"]
  },
  "출자 총액": {
    "type": "radio", 
    "name":"total_amount_of_investment", 
    "value": ["2억원 미만", "2억원 ~ 4억원 미만", "4억원 이상"]
  },
  "최소 출자액": {
    "type": "radio", 
    "name":"min_amount_of_investment",
    "value": ["5백만원 미만", "5백만원 ~ 1천만원 미만", "1천만원 이상"]
  } 
}


const FilterItem = styled.input`
`;
const FilterPresentor = styled.section`
  display: grid;
  /* grid-template-rows: repeat(${props => props.rows}, 1fr); */
  grid-template-rows: 1fr;
  align-items:center;
  font-size:1.1rem;
  padding:1rem;
  /* padding-left:1rem;
  padding-right:1rem; */
  border-color: gray;  
  border-top-style: solid;
  border-width: thin;
`;

const FilterSection = (props) => {
  const { title } = props;
    
  return (
    <FilterPresentor rows={filters[title]["value"].length+1} >
      <div>
        <b>{title}</b><br /><br />
        {filters[title]["value"].map((filter, idx) => {
          return (
            <React.Fragment key={`${filters[title]["name"]}-${idx}`}>
              <FilterItem type={filters[title]["type"]} name={filters[title]["name"]} value={idx} /> 
              {filter}<br />
            </React.Fragment>
          );
        })} 
      </div>
    </FilterPresentor>
  );
}

export default FilterSection;
