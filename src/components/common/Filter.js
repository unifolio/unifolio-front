import React from 'react';
import styled from 'styled-components';

const Filter = ({filterVisible, setFilterVisible,mode}) => {
    switch (filterVisible) {
        case true :
            return(
                <>
                    <FilterHeader>
                        <FilterTitle>
                            필터 검색
                        </FilterTitle>
                        <FilterCloseBtn onClick={()=>setFilterVisible(!filterVisible)}>
                            X
                        </FilterCloseBtn>
                    </FilterHeader>
                    <FilterSection>
                        <FilterSubTitle>
                            최대 출자가능액
                        </FilterSubTitle>
                        <FilterList>
                            <FilterListItem>
                                <FilterCheckBox type='checkbox' name='qustion1' value='1' id='1'/>
                                <FilterListLabel htmlFor='1'>
                                    5백만원 미만
                                </FilterListLabel>
                            </FilterListItem>
                            <FilterListItem>
                                <FilterCheckBox type='checkbox' name='qustion1' value='1' id='1'/>
                                <FilterListLabel htmlFor='1'>
                                    5백만원 ~ 1천만원 미만 
                                </FilterListLabel>
                            </FilterListItem>
                            <FilterListItem>
                                <FilterCheckBox type='checkbox' name='qustion1' value='1' id='1'/>
                                <FilterListLabel htmlFor='1'>
                                    1천만원 이상
                                </FilterListLabel>
                            </FilterListItem>
                        </FilterList>
                    </FilterSection>
                    <FilterSection>
                        <FilterSubTitle>
                            회사 분야
                        </FilterSubTitle>
                        <FilterList>
            
                        <FilterListItem>
                                <FilterCheckBox type='checkbox' name='qustion1' value='1' id='1'/>
                                <FilterListLabel htmlFor='1'>
                                    자동차
                                </FilterListLabel>
                        </FilterListItem>
                        <FilterListItem>
                                <FilterCheckBox type='checkbox' name='qustion1' value='1' id='1'/>
                                <FilterListLabel htmlFor='1'>
                                    유통
                                </FilterListLabel>
                        </FilterListItem>
                        <FilterListItem>
                                <FilterCheckBox type='checkbox' name='qustion1' value='1' id='1'/>
                                <FilterListLabel htmlFor='1'>
                                    유통
                                </FilterListLabel>
                        </FilterListItem>
                        <FilterListItem>
                                <FilterCheckBox type='checkbox' name='qustion1' value='1' id='1'/>
                                <FilterListLabel htmlFor='1'>
                                    유통
                                </FilterListLabel>
                        </FilterListItem>
                        <FilterListItem>
                                <FilterCheckBox type='checkbox' name='qustion1' value='1' id='1'/>
                                <FilterListLabel htmlFor='1'>
                                    유통
                                </FilterListLabel>
                        </FilterListItem>
                        <FilterListItem>
                                <FilterCheckBox type='checkbox' name='qustion1' value='1' id='1'/>
                                <FilterListLabel htmlFor='1'>
                                    유통
                                </FilterListLabel>
                        </FilterListItem>
                        <FilterListItem>
                                <FilterCheckBox type='checkbox' name='qustion1' value='1' id='1'/>
                                <FilterListLabel htmlFor='1'>
                                    유통
                                </FilterListLabel>
                        </FilterListItem>
                        </FilterList>
                        <FilterMoreBtn>더 많은 분야 보기</FilterMoreBtn>
                    </FilterSection>
                    
                </>
                );
        case false : 
          return (<div>dd</div>)
        default : 
          return null
      }

}

const FilterHeader = styled.header`
	display:flex;
	align-items:center;
	justify-content:space-between;
	font-size: 1rem;
    line-height: 1rem;
	padding-left:2rem;
    padding-right:1.5rem;
	padding-top:2.5rem;
	padding-bottom: 1rem;
    border-bottom: 1px solid #C4C4C4;

`;
const FilterTitle = styled.h2`
    font-weight: 400;
`;
const FilterCloseBtn = styled.button`
    justify-Items: 'center';
    background-color:#fff;
    border:0;
    font-size: 13px;
    color: #847F7F;
    padding-bottom:8px;
    cursor: pointer;
    outline:none;

`;
const FilterSection = styled.section`
	display:flex;
    flex-direction:column;
	align-items:center;
    justify-content:center;

    margin-top: 1.25rem;
    border-bottom: 1px solid #C4C4C4;
    padding-bottom: 1.25rem;
`;

const FilterSubTitle = styled.h3`
    display:block;
    width:100%;
    padding-left:2rem;

    font-weight:400;
    font-size: 14px;
    margin-bottom: 12px;
`;
const FilterCheckBox = styled.input`
    width: 14px;
    height: 14px;
    appearance: none;
    outline:none;
    border-radius: 20%;
    margin-right: 12px;
    border:1px solid rgba(64, 64, 64, 0.4);
    position: relative;
   
    &:checked{
        background-color: #3C2FF2;
        appearance: none;
        outline:none;
        border:0;
    }
    &:checked&::before{
        content:'';
        width:6px;
        height:6px;
        position:absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        border-radius: 100%;
        text-align:center;
        background-color: white;  
    }
    &+label{
        color: rgba(64, 64, 64, 0.6);
    }
    &:checked+label{
        color: black;
    }
`;

const FilterList = styled.ul`
    display:block;
    width:100%;
    padding-left:2rem;
    margin-bottom:0;
`;
const FilterListItem = styled.li`
    display:flex;
    align-items:center;
    margin-bottom:10px;
    &:last-child{
        margin-bottom:0;
    }
`;

const FilterListLabel = styled.label`
`;

const FilterMoreBtn = styled.button`
    display:flex;
    justify-content:space-between;
    padding-left:2rem;
    width:100%;
    background-color:#fff;
    border:0;
    font-size: 13px;
    color: #847F7F;
    color:rgba(60, 47, 242, 1);
    outline:none;
    cursor: pointer;
    margin-top: 1rem;
`;

export default Filter;