import React , {useState} from 'react';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';

import API from '../lib/api';

import { addExecutiveMemberInfo, addUnionDefaultInfo, addUnionOfficeInfo, addUnionInvestInfo, getUnionCreateStateThunk } from 'modules/reducers/unionCreate';

import PersonalUnionCreate01 from 'composition/UnionCreate/PersonalUnionCreate01';
import PersonalUnionCreate02 from 'composition/UnionCreate/PersonalUnionCreate02';
import PersonalUnionCreate03 from 'composition/UnionCreate/PersonalUnionCreate03';
import PersonalUnionCreate04 from 'composition/UnionCreate/PersonalUnionCreate04';
import PersonalUnionCreate05 from 'composition/UnionCreate/PersonalUnionCreate05';

const UnionCreateContainer = () => {
	const dispatch = useDispatch();
  const [process, setProcess] = useState(1);

	const onClickNext = async (formData, process) => {
		
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
    setProcess(process+1); // 프로세스 값 갱신
	};

  const render = () => {
    switch (process) {
      case 1:
        return <PersonalUnionCreate01 onClickNext={onClickNext} />
      case 2:
        return <PersonalUnionCreate02 onClickNext={onClickNext} />
      case 3:
        return <PersonalUnionCreate03 onClickNext={onClickNext} />
      case 4:
        return <PersonalUnionCreate04 onClickNext={onClickNext} />
      case 5:
        return <PersonalUnionCreate05 onClickNext={onClickNext} />
      default:
        return <></>
    }
  }

	return (
		<PersonalUnionCreateLayout>
      {render()}
		</PersonalUnionCreateLayout>
	);
};
const PersonalUnionCreateLayout = styled.div`
	width: 100%;
`;
export default UnionCreateContainer;
