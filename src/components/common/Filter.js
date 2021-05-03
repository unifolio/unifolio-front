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
          return (
        <MiniFilterWrap>
              <MiniFilterHeader>
                  <MiniFilterTitle>
                      총 <MiniFilterTitleListCount>20건</MiniFilterTitleListCount> 검색
                  </MiniFilterTitle>
              </MiniFilterHeader>
              <MiniFilterSection>
                <MiniFilterSubTitleWrap>
                    <MiniFilterSubTitle>필터</MiniFilterSubTitle> 
                    <MiniFilterOpenBtn onClick={()=>setFilterVisible(!filterVisible)}>전체보기</MiniFilterOpenBtn>
                </MiniFilterSubTitleWrap>
                <MiniFilterList>
                    <MiniFilterListItem>
                        <MiniFilterName>
                             최대출자가능액
                        </MiniFilterName>
                        <MiniFilterValue>
                            500만원~1천만원 미만
                        </MiniFilterValue>
                    </MiniFilterListItem>
                    <MiniFilterListItem>
                        <MiniFilterName>
                             경력분야
                        </MiniFilterName>
                        <MiniFilterValue>
                            유통, 커머스 분야만
                        </MiniFilterValue>
                    </MiniFilterListItem>
                </MiniFilterList>
              </MiniFilterSection>

              <MiniFilterSection>
                <MiniFilterSubTitleWrap>
                    <MiniFilterSubTitle>내가 본 출자자</MiniFilterSubTitle> 
                    <MiniFilterOpenBtn>전체보기</MiniFilterOpenBtn>
                </MiniFilterSubTitleWrap>
                <NoContentWrap>
                    <NoContent>
                        최근 열람한 출자자의
                    </NoContent>
                    <NoContent>
                        정보가 표시됩니다.
                    </NoContent>
                </NoContentWrap>
                <table></table>
              </MiniFilterSection>
        </MiniFilterWrap>)
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
const FilterTitle = styled.span`
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

const FilterSubTitle = styled.span`
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
        font-weight:400;

    }
    &:checked+label{
        color: black;
        font-weight:500;
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
    padding-left:2rem;
    width:100%;
    background-color:#fff;
    border:0;
    font-size: 13px;
    color:rgba(60, 47, 242, 1);
    outline:none;
    cursor: pointer;
    margin-top: 1rem;
    text-align:left;
`;

const MiniFilterWrap = styled.section`
    width: 148px;
    min-height: 483px;
    box-shadow : 0px 4px 4px rgba(0,0,0,0.25);
`;

const MiniFilterHeader = styled.header`
    padding-top:19px;
    padding-left: 12px;
    padding-bottom: 14px;
`;
const MiniFilterTitle = styled.span`
    font-size: 14px;
    font-weight:normal;
`;

const MiniFilterTitleListCount = styled.span`
    font-weight:700;
    color:rgba(60, 47, 242, 1);
`;

const MiniFilterSection = styled.section`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    min-height:85px;
    padding-top:19px;
    padding-left: 12px;
    padding-bottom: 14px;
    border-top: 1px solid #C4C4C4;
    padding-right: 10px;
    &:last-child{
        min-height:306px;

    }
`;

const MiniFilterSubTitleWrap = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 4px;
`;

const MiniFilterSubTitle = styled.span`
    font-size: 12px;
`;
const MiniFilterOpenBtn = styled.button`
    display:flex;
    background-color:#fff;
    border: 1px solid rgba(60, 47, 242, 1);
    border-radius:20px;
    font-size: 10px;
    color:rgba(60, 47, 242, 1);
    outline:none;
    cursor: pointer;
`;

const MiniFilterList = styled.ul`
    margin-bottom:0;
`;

const MiniFilterListItem = styled.li`
    margin-top: 8px;
`;

const MiniFilterName = styled.span`
    display: block;
    font-size: 10px;
    line-height: 16px;
`;

const MiniFilterValue = styled(MiniFilterName)`
    color:rgba(60, 47, 242, 1);
`;

const NoContentWrap = styled.div`
    width: 100%;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
`;

const NoContent = styled.span`

    color: #847F7F;
    font-size: 9px;
    line-height: 12px;
`;
export default Filter;