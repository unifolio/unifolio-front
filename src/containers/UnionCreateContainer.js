import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Personal, Business } from 'composition/UnionCreate';
import UnionCreateHeaderBusiness from 'components/Header/UnionCreateHeaderBusiness';

import useFetchUserToken from 'hooks/useFetchUserToken';
import API from 'lib/api';

import {
  addExecutiveMemberInfo,
  addUnionDefaultInfo,
  addUnionOfficeInfo,
  addUnionInvestInfo,
  addUnionDetailPlanInfo,
  getUnionCreateStateThunk,
} from 'modules/reducers/unionCreate';

const UnionCreateContainer = ({ type }) => {
  const [process, setProcess] = useState(1);
  const { user } = useFetchUserToken();

  const dispatch = useDispatch();
  const unionCreateInputData = useSelector((state) => state.unionCreate);

  const handleClickNext = async (formData, process) => {
    if (type !== 'business') {
      console.log('비즈니스 계정이 아닙니다');
      return false;
    }
    switch (process) {
      case 1:
        dispatch(addExecutiveMemberInfo(formData));
        break;
      case 2:
        dispatch(addUnionDefaultInfo(formData));
        break;
      case 3:
        dispatch(addUnionOfficeInfo(formData));
        break;
      case 4:
        dispatch(addUnionInvestInfo(formData));
        break;
      case 5:
        dispatch(addUnionDetailPlanInfo(formData));
        break;
      case 6:
        const data = dispatch(getUnionCreateStateThunk());
        console.log(data); // 임시 0131

        data.is_confirm_1 = true;
        data.is_confirm_2 = true;
        data.is_confirm_3 = true;
        data.address_postcode = data.address_postcode_union;
        data.address = data.address_business_union;
        data.address_detail = data.address_detail_business_union;
        data.email = data.email_union;
        data.fax = data.fax_union;
        data.phone = data.phone_union;
        /* django code
         invest_category = CategorySerializer(many=True):
            category = CharField(max_length=60)
         */
        data.invest_category = data.invest_category.map((categoryData) => {
          return { category: categoryData.category.category };
        });
        const response = await API.post.newUnionBusiness(data);
        if (response.data.status === 200 || response.data.status === 201) {
          alert('조합 생성이 완료되었습니다');
        } else {
          alert('not ok');
          console.log(response);
          // window.location.href = '/signin';
        }
        break;
      default:
        console.error('회원가입 에러');
    }
    setProcess((prevProcess) => prevProcess + 1); // 프로세스 값 갱신
  };

  const handleClickBack = (targetProcess) => {
    if (type === 'business') {
      setProcess(targetProcess);
    }
  };

  const renderSteps = () => {
    if (type === 'business') {
      switch (process) {
        case 1:
          if (user)
            return <Business._01 onClickNext={handleClickNext} user={user} />;
          else return <></>;
        case 2:
          return (
            <Business._02
              user={user}
              unionCreateInputData={unionCreateInputData}
              onClickNext={handleClickNext}
              onClickBack={handleClickBack}
            />
          );
        case 3:
          return (
            <Business._03
              user={user}
              unionCreateInputData={unionCreateInputData}
              onClickNext={handleClickNext}
              onClickBack={handleClickBack}
            />
          );
        case 4:
          return (
            <Business._04
              user={user}
              unionCreateInputData={unionCreateInputData}
              onClickNext={handleClickNext}
              onClickBack={handleClickBack}
            />
          );
        case 5:
          return (
            <Business._05
              user={user}
              unionCreateInputData={unionCreateInputData}
              onClickNext={handleClickNext}
              onClickBack={handleClickBack}
            />
          );
        case 6:
          return (
            <Business._06
              user={user}
              unionCreateInputData={unionCreateInputData}
              onClickNext={handleClickNext}
              onClickBack={handleClickBack}
            />
          );
        default:
          return <></>;
      }
    } else {
      switch (process) {
        case 1:
          return <Personal._01 onClickNext={handleClickNext} />;
        case 2:
          return <Personal._02 onClickNext={handleClickNext} />;
        case 3:
          return <Personal._03 onClickNext={handleClickNext} />;
        case 4:
          return <Personal._04 onClickNext={handleClickNext} />;
        case 5:
          return <Personal._05 onClickNext={handleClickNext} />;
        default:
          return <></>;
      }
    }
  };

  return (
    <>
      <UnionCreateHeaderBusiness current={process} />
      <br />
      <PersonalUnionCreateLayout>{renderSteps()}</PersonalUnionCreateLayout>
    </>
  );
};

const PersonalUnionCreateLayout = styled.div`
  width: 100%;
`;

export default UnionCreateContainer;
