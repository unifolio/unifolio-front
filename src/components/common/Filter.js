import {
  ADD_CAREERSID_FILTER_PEOPLE,
  ADD_CATEGORISID_FILTER_UNION,
  CHANGE_AMOUNT_RANGE_FILTER_PEOPLE,
  CHANGE_AMOUNT_RANGE_FILTER_UNION,
  CHANGE_COLLECT_AMOUNT_RANGE_FILTER_UNION,
  DELETE_CAREERSID_FILTER_PEOPLE,
  DELETE_CATEGORISID_FILTER_UNION,
  DELETE_END_DATE_UNION,
  SET_END_DATE_UNION,
} from 'modules/reducers/finding';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import useSWR from 'swr';
import fetcher from 'util/fetcher';
import {
  generateApiLinkPeople,
  generateApiLinkUnion,
} from 'util/generateApiLink';

const Filter = ({
  filterVisible,
  setFilterVisible,
  mode = 'waiting-people',
  categories,
}) => {
  const [moreCategory, setMoreCategory] = useState(false);
  const dispatch = useDispatch();
  const { amountRange: peopleAmountRange, careersId: peopleCareersId } =
    useSelector((state) => state.finding.waitingPeople);
  const {
    collectAmountRange,
    amountRange: unionAmountRange,
    categoriesId: unionCategoriesId,
    endDate,
  } = useSelector((state) => state.finding.waitingUnions);

  const onClickAmountPeople = (e) => {
    const target = e.target;
    const clickOption = target.value;
    dispatch({
      type: CHANGE_AMOUNT_RANGE_FILTER_PEOPLE,
      payload: Number(clickOption),
    });
  };

  const onClickCareersIdsPeople = (e) => {
    const target = e.target;
    const clickOption = JSON.parse(target.value);
    const includesCareers = peopleCareersId.map((id) => {
      return JSON.stringify(id) === JSON.stringify(clickOption);
    });
    if (includesCareers.includes(true)) {
      dispatch({
        type: DELETE_CAREERSID_FILTER_PEOPLE,
        payload: clickOption,
      });
    } else {
      dispatch({
        type: ADD_CAREERSID_FILTER_PEOPLE,
        payload: clickOption,
      });
    }
  };

  const onClickCollectAmountUnion = (e) => {
    const target = e.target;
    const clickOption = target.value;
    dispatch({
      type: CHANGE_COLLECT_AMOUNT_RANGE_FILTER_UNION,
      payload: Number(clickOption),
    });
  };

  const onClickAmountUnion = (e) => {
    const target = e.target;
    const clickOption = target.value;
    dispatch({
      type: CHANGE_AMOUNT_RANGE_FILTER_UNION,
      payload: Number(clickOption),
    });
  };
  const onClickCategoriesIdsUnion = (e) => {
    const target = e.target;
    const clickOption = JSON.parse(target.value);
    const includesCategories = unionCategoriesId.map((id) => {
      return JSON.stringify(id) === JSON.stringify(clickOption);
    });
    if (includesCategories.includes(true)) {
      dispatch({
        type: DELETE_CATEGORISID_FILTER_UNION,
        payload: clickOption,
      });
    } else {
      dispatch({
        type: ADD_CATEGORISID_FILTER_UNION,
        payload: clickOption,
      });
    }
  };

  const onClickEndDateUnion = () => {
    const now = new Date();
    if (!!endDate) {
      dispatch({ type: DELETE_END_DATE_UNION });
    } else {
      dispatch({
        type: SET_END_DATE_UNION,
        payload: new Date(now.setDate(now.getDate() + 7)),
      });
    }
  };
  const onClickMoreBtn = () => {
    setMoreCategory(!moreCategory);
  };

  const { data: waitingPeopleData } = useSWR(
    generateApiLinkPeople(peopleAmountRange, peopleCareersId),
    fetcher,
  );
  const { data: waitingUnionsData } = useSWR(
    generateApiLinkUnion(
      endDate,
      collectAmountRange,
      unionAmountRange,
      unionCategoriesId,
    ),
    fetcher,
  );
  if (filterVisible) {
    if (mode === 'waiting-people') {
      return (
        <>
          <FilterHeader>
            <FilterTitle>필터 검색</FilterTitle>
            <FilterCloseBtn onClick={() => setFilterVisible(!filterVisible)}>
              X
            </FilterCloseBtn>
          </FilterHeader>

          <FilterSection>
            <FilterSubTitle>최대 출자가능액</FilterSubTitle>
            <FilterList>
              <FilterListItem>
                <FilterCheckBox
                  type='radio'
                  name='최대 출자가능액'
                  value={0}
                  id='전체 금액'
                  defaultChecked={peopleAmountRange === 0}
                  onClick={onClickAmountPeople}
                />
                <FilterListLabel htmlFor='전체 금액'>전체 금액</FilterListLabel>
              </FilterListItem>
              <FilterListItem>
                <FilterCheckBox
                  type='radio'
                  name='최대 출자가능액'
                  value={1}
                  id='최대-5백만원 미만'
                  defaultChecked={peopleAmountRange === 1}
                  onClick={onClickAmountPeople}
                />
                <FilterListLabel htmlFor='최대-5백만원 미만'>
                  5백만원 미만
                </FilterListLabel>
              </FilterListItem>
              <FilterListItem>
                <FilterCheckBox
                  type='radio'
                  name='최대 출자가능액'
                  value={2}
                  id='최대-5백만원~1천만원 미만'
                  defaultChecked={peopleAmountRange === 2}
                  onClick={onClickAmountPeople}
                />
                <FilterListLabel htmlFor='최대-5백만원~1천만원 미만'>
                  5백만원 ~ 1천만원 미만
                </FilterListLabel>
              </FilterListItem>
              <FilterListItem>
                <FilterCheckBox
                  type='radio'
                  name='최대 출자가능액'
                  value={3}
                  id='최대-1천만원 이상'
                  onClick={onClickAmountPeople}
                  defaultChecked={peopleAmountRange === 3}
                />
                <FilterListLabel htmlFor='최대-1천만원 이상'>
                  1천만원 이상
                </FilterListLabel>
              </FilterListItem>
            </FilterList>
          </FilterSection>
          <FilterSection>
            <FilterSubTitle>회사 분야</FilterSubTitle>
            <FilterList>
              {categories &&
                (moreCategory ? categories : categories?.slice(0, 5)).map(
                  (item, index) => (
                    <FilterListItem key={index}>
                      <FilterCheckBox
                        type='checkbox'
                        name='회사 분야'
                        value={JSON.stringify(item)}
                        id={item.category}
                        onClick={onClickCareersIdsPeople}
                        defaultChecked={peopleCareersId
                          .map((id) => {
                            return JSON.stringify(id) === JSON.stringify(item);
                          })
                          .includes(true)}
                      />
                      <FilterListLabel htmlFor={item.category}>
                        {item.category}
                      </FilterListLabel>
                    </FilterListItem>
                  ),
                )}
            </FilterList>
            <FilterMoreBtn onClick={onClickMoreBtn}>
              {moreCategory ? '줄이기' : '더 많은 분야 보기'}
            </FilterMoreBtn>
          </FilterSection>
        </>
      );
    } else {
      return (
        <>
          <FilterHeader>
            <FilterTitle>필터 검색</FilterTitle>
            <FilterCloseBtn onClick={() => setFilterVisible(!filterVisible)}>
              X
            </FilterCloseBtn>
          </FilterHeader>
          <>
            <FilterSection>
              <FilterSubTitle>조합 상태</FilterSubTitle>
              <FilterList>
                <FilterListItem>
                  <FilterCheckBox
                    type='checkbox'
                    name='조합 상태'
                    value='결성이 임박한 조합'
                    id='결성이 임박한 조합'
                    onClick={onClickEndDateUnion}
                    defaultChecked={!!endDate}
                  />
                  <FilterListLabel htmlFor='결성이 임박한 조합'>
                    결성이 임박한 조합
                  </FilterListLabel>
                </FilterListItem>
              </FilterList>
            </FilterSection>
            <FilterSection>
              <FilterSubTitle>투자 분야</FilterSubTitle>
              <FilterList>
                {categories &&
                  (moreCategory ? categories : categories?.slice(0, 5)).map(
                    (item, index) => (
                      <FilterListItem key={index + `${item}`}>
                        <FilterCheckBox
                          type='checkbox'
                          name='투자 분야'
                          value={JSON.stringify(item)}
                          id={item.category}
                          onClick={onClickCategoriesIdsUnion}
                          defaultChecked={unionCategoriesId
                            .map((id) => {
                              return (
                                JSON.stringify(id) === JSON.stringify(item)
                              );
                            })
                            .includes(true)}
                        />
                        <FilterListLabel htmlFor={item.category}>
                          {item.category}
                        </FilterListLabel>
                      </FilterListItem>
                    ),
                  )}
              </FilterList>
              <FilterMoreBtn onClick={onClickMoreBtn}>
                {moreCategory ? '줄이기' : '더 많은 분야 보기'}
              </FilterMoreBtn>
            </FilterSection>
            <FilterSection>
              <FilterSubTitle>출자 총액</FilterSubTitle>
              <FilterList>
                <FilterListItem>
                  <FilterCheckBox
                    type='radio'
                    name='출자 총액'
                    value={0}
                    id='출자 총액 전체 금액'
                    onClick={onClickCollectAmountUnion}
                    defaultChecked={collectAmountRange === 0}
                  />
                  <FilterListLabel htmlFor='출자 총액 전체 금액'>
                    전체 금액
                  </FilterListLabel>
                </FilterListItem>
                <FilterListItem>
                  <FilterCheckBox
                    type='radio'
                    name='출자 총액'
                    value={1}
                    id='2억원 미만'
                    onClick={onClickCollectAmountUnion}
                    defaultChecked={collectAmountRange === 1}
                  />
                  <FilterListLabel htmlFor='2억원 미만'>
                    2억원 미만
                  </FilterListLabel>
                </FilterListItem>
                <FilterListItem>
                  <FilterCheckBox
                    type='radio'
                    name='출자 총액'
                    value={2}
                    id='2억원 ~ 4억원 미만'
                    onClick={onClickCollectAmountUnion}
                    defaultChecked={collectAmountRange === 2}
                  />
                  <FilterListLabel htmlFor='2억원 ~ 4억원 미만'>
                    2억원 ~ 4억원 미만
                  </FilterListLabel>
                </FilterListItem>
                <FilterListItem>
                  <FilterCheckBox
                    type='radio'
                    name='출자 총액'
                    value={3}
                    id='4억원 이상'
                    onClick={onClickCollectAmountUnion}
                    defaultChecked={collectAmountRange === 3}
                  />
                  <FilterListLabel htmlFor='4억원 이상'>
                    4억원 이상
                  </FilterListLabel>
                </FilterListItem>
              </FilterList>
            </FilterSection>
            <FilterSection>
              <FilterSubTitle>최소 출자액</FilterSubTitle>
              <FilterList>
                <FilterListItem>
                  <FilterCheckBox
                    type='radio'
                    name='최소 출자액'
                    value={0}
                    id='최소 출자액 조합 전체 금액'
                    onClick={onClickAmountUnion}
                    defaultChecked={unionAmountRange === 0}
                  />
                  <FilterListLabel htmlFor='최소 출자액 조합 전체 금액'>
                    전체 금액
                  </FilterListLabel>
                </FilterListItem>
                <FilterListItem>
                  <FilterCheckBox
                    type='radio'
                    name='최소 출자액'
                    value={1}
                    id='조합 최소-5백만원 미만'
                    onClick={onClickAmountUnion}
                    defaultChecked={unionAmountRange === 1}
                  />
                  <FilterListLabel htmlFor='조합 최소-5백만원 미만'>
                    5백만원 미만
                  </FilterListLabel>
                </FilterListItem>
                <FilterListItem>
                  <FilterCheckBox
                    type='radio'
                    name='최소 출자액'
                    value={2}
                    id='조합 최소-5백만원 ~ 1천만원 미만'
                    onClick={onClickAmountUnion}
                    defaultChecked={unionAmountRange === 2}
                  />
                  <FilterListLabel htmlFor='조합 최소-5백만원 ~ 1천만원 미만'>
                    5백만원 ~ 1천만원 미만
                  </FilterListLabel>
                </FilterListItem>
                <FilterListItem>
                  <FilterCheckBox
                    type='radio'
                    name='최소 출자액'
                    value={3}
                    id='조합 최소-1천만원 이상'
                    onClick={onClickAmountUnion}
                    defaultChecked={unionAmountRange === 3}
                  />
                  <FilterListLabel htmlFor='조합 최소-1천만원 이상'>
                    1천만원 이상
                  </FilterListLabel>
                </FilterListItem>
              </FilterList>
            </FilterSection>
          </>
        </>
      );
    }
  } else {
    const rendering = () => {
      if (mode === 'waiting-people') {
        const itemComponent = [];
        itemComponent.push(
          <MiniFilterName key='최대 출자 가능액'>
            최대 출자 가능액
          </MiniFilterName>,
        );
        itemComponent.push(
          <>
            <MiniFilterValue key='금액'>
              {(peopleAmountRange === 0 && '전체 금액') ||
                (peopleAmountRange === 1 && '5백만원 미만') ||
                (peopleAmountRange === 2 && '5백만원 ~ 1천만원 미만') ||
                (peopleAmountRange === 3 && '1천만원 이상')}
            </MiniFilterValue>
            <br />
          </>,
        );
        if (peopleCareersId.length !== 0) {
          itemComponent.push(
            <MiniFilterName key='회사 분야'>회사 분야</MiniFilterName>,
          );
          peopleCareersId.map((career) => {
            itemComponent.push(
              <MiniFilterValue key={career.id}>
                {career.category}
              </MiniFilterValue>,
            );
          });
        }
        return (
          <MiniFilterListItem key={itemComponent}>
            {itemComponent}
          </MiniFilterListItem>
        );
      } else {
        const itemComponent = [];
        if (!!endDate) {
          itemComponent.push(
            <>
              <MiniFilterName key='조합 상태'>조합 상태</MiniFilterName>
              <MiniFilterValue key={'결성이 임박한 조합'}>
                결성이 임박한 조합
              </MiniFilterValue>
              <br />
            </>,
          );
        }

        if (unionCategoriesId.length !== 0) {
          itemComponent.push(
            <MiniFilterName key='xnwk 분야'>투자 분야</MiniFilterName>,
          );
          unionCategoriesId.map((category) => {
            itemComponent.push(
              <MiniFilterValue key={category.id}>
                {category.category}
              </MiniFilterValue>,
            );
          });
          itemComponent.push(<br />);
        }

        itemComponent.push(
          <MiniFilterName key='출자 총액'>출자 총액</MiniFilterName>,
        );
        itemComponent.push(
          <>
            <MiniFilterValue key='최소 출자액 금액'>
              {(collectAmountRange === 0 && '전체 금액') ||
                (collectAmountRange === 1 && '2억원 미만') ||
                (collectAmountRange === 2 && '2억원 ~ 4억원 미만') ||
                (collectAmountRange === 3 && '4억원 이상')}
            </MiniFilterValue>
            <br />
          </>,
        );
        itemComponent.push(
          <MiniFilterName key='최소 출자액'>최소 출자액</MiniFilterName>,
        );
        itemComponent.push(
          <>
            <MiniFilterValue key='최소 출자액 금액'>
              {(unionAmountRange === 0 && '전체 금액') ||
                (unionAmountRange === 1 && '5백만원 미만') ||
                (unionAmountRange === 2 && '5백만원 ~ 1천만원 미만') ||
                (unionAmountRange === 3 && '1천만원 이상')}
            </MiniFilterValue>
            <br />
          </>,
        );
        return (
          <MiniFilterListItem key={itemComponent}>
            {itemComponent}
          </MiniFilterListItem>
        );
      }
    };
    return (
      <MiniFilterWrap>
        <MiniFilterHeader>
          <MiniFilterTitle>
            총
            <MiniFilterTitleListCount>
              {
                (mode === 'waiting-people'
                  ? waitingPeopleData
                  : waitingUnionsData
                )?.length
              }
              건
            </MiniFilterTitleListCount>{' '}
            검색
          </MiniFilterTitle>
        </MiniFilterHeader>
        <MiniFilterSection>
          <MiniFilterSubTitleWrap>
            <MiniFilterSubTitle>필터</MiniFilterSubTitle>
            <MiniFilterOpenBtn onClick={() => setFilterVisible(!filterVisible)}>
              전체보기
            </MiniFilterOpenBtn>
          </MiniFilterSubTitleWrap>
          <MiniFilterList>{rendering()}</MiniFilterList>
        </MiniFilterSection>

        <MiniFilterSection>
          <MiniFilterSubTitleWrap>
            <MiniFilterSubTitle>
              {mode === 'waiting-people' ? '내가 본 출자자' : '내가 본 조합'}
            </MiniFilterSubTitle>
            <MiniFilterOpenBtn>전체보기</MiniFilterOpenBtn>
          </MiniFilterSubTitleWrap>
          <NoContentWrap>
            <NoContent>최근 열람한 출자자의</NoContent>
            <NoContent>정보가 표시됩니다.</NoContent>
          </NoContentWrap>
          <table></table>
        </MiniFilterSection>
      </MiniFilterWrap>
    );
  }
};

const FilterHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  line-height: 1rem;
  padding-left: 2rem;
  padding-right: 1.5rem;
  padding-top: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #c4c4c4;
`;
const FilterTitle = styled.span`
  font-weight: 400;
`;
const FilterCloseBtn = styled.button`
  justify-items: 'center';
  background-color: #fff;
  border: 0;
  font-size: 13px;
  color: #847f7f;
  padding-bottom: 8px;
  cursor: pointer;
  outline: none;
`;
const FilterSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 1.25rem;
  border-bottom: 1px solid #c4c4c4;
  padding-bottom: 1.25rem;
`;

const FilterSubTitle = styled.span`
  display: block;
  width: 100%;
  padding-left: 2rem;

  font-weight: 400;
  font-size: 14px;
  margin-bottom: 12px;
`;
const FilterCheckBox = styled.input`
  width: 14px;
  height: 14px;
  appearance: none;
  outline: none;
  border-radius: 20%;
  margin-right: 12px;
  border: 1px solid rgba(64, 64, 64, 0.4);
  position: relative;

  &:checked {
    background-color: #3c2ff2;
    appearance: none;
    outline: none;
    border: 0;
  }
  &:checked&::before {
    content: '';
    width: 6px;
    height: 6px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 100%;
    text-align: center;
    background-color: white;
  }
  & + label {
    color: rgba(64, 64, 64, 0.6);
    font-weight: 400;
  }
  &:checked + label {
    color: black;
    font-weight: 500;
  }
`;

const FilterList = styled.ul`
  display: block;
  width: 100%;
  padding-left: 2rem;
  margin-bottom: 0;
`;
const FilterListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterListLabel = styled.label``;

const FilterMoreBtn = styled.button`
  padding-left: 2rem;
  width: 100%;
  background-color: #fff;
  border: 0;
  font-size: 13px;
  color: rgba(60, 47, 242, 1);
  outline: none;
  cursor: pointer;
  margin-top: 1rem;
  text-align: left;
`;

const MiniFilterWrap = styled.section`
  width: 148px;
  min-height: 483px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const MiniFilterHeader = styled.header`
  padding-top: 19px;
  padding-left: 12px;
  padding-bottom: 14px;
`;
const MiniFilterTitle = styled.span`
  font-size: 14px;
  font-weight: normal;
`;

const MiniFilterTitleListCount = styled.span`
  font-weight: 700;
  color: rgba(60, 47, 242, 1);
`;

const MiniFilterSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 85px;
  padding-top: 19px;
  padding-left: 12px;
  padding-bottom: 14px;
  border-top: 1px solid #c4c4c4;
  padding-right: 10px;
  &:last-child {
    min-height: 306px;
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
  display: flex;
  background-color: #fff;
  border: 1px solid rgba(60, 47, 242, 1);
  border-radius: 20px;
  font-size: 10px;
  color: rgba(60, 47, 242, 1);
  outline: none;
  cursor: pointer;
`;

const MiniFilterList = styled.ul`
  margin-bottom: 0;
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
  color: rgba(60, 47, 242, 1);
`;

const NoContentWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const NoContent = styled.span`
  color: #847f7f;
  font-size: 9px;
  line-height: 12px;
`;
export default Filter;
