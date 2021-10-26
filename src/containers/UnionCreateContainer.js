import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';

import API from 'lib/api';

import { 
  addExecutiveMemberInfo, addUnionDefaultInfo, addUnionOfficeInfo, addUnionInvestInfo, 
  getUnionCreateStateThunk 
} from 'modules/reducers/unionCreate';

import { Personal, Corporation } from 'composition/UnionCreate';

const UnionCreateContainer = () => {
	const [process, setProcess] = useState(1);
  const dispatch = useDispatch();
  
	const handleClickNext = async (formData, process) => {
		
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
        const data = dispatch(getUnionCreateStateThunk());
        console.log(data)
        const response = await API.post.newUnion(data);
        if (response.status === 200 || response.status === 201) {
          alert('조합 생성이 완료되었습니다');
        } else {
          alert('not ok');
          console.log(response)
          // window.location.href = '/signin';
        }
				break;
      default:
        console.error("회원가입 에러");
		}
    setProcess((prevProcess) => prevProcess+1); // 프로세스 값 갱신
	};

  const renderSteps = () => {
    switch (process) {
      case 1:
        return <Personal._01 onClickNext={handleClickNext} />
      case 2:
        return <Personal._02 onClickNext={handleClickNext} />
      case 3:
        return <Personal._03 onClickNext={handleClickNext} />
      case 4:
        return <Personal._04 onClickNext={handleClickNext} />
      case 5:
        return <Personal._05 onClickNext={handleClickNext} />
      default:
        return <></>
    }
  }

	return (
		<PersonalUnionCreateLayout>
      {renderSteps()}
		</PersonalUnionCreateLayout>
	);
};

const PersonalUnionCreateLayout = styled.div`
	width: 100%;
`;

export default UnionCreateContainer;