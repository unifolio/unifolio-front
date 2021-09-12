/* 액션 타입 선언 */

// import { addSchoolInfo, addBusinessInfo, addPhone, addAgreement, getSignupStateThunk } from '../modules/reducers/createUnion';

// const ADD_SCHOOL_AND_CAREER_INFO = 'unionCreate/ADD_SCHOOL_AND_CAREER_INFO';

const ADD_EXECUTIVE_MEMBER_INFO = 'unionCreate/ADD_EXECUTIVE_MEMBER_INFO';
const ADD_UNION_DEFAULT_INFO = 'unionCreate/ADD_UNION_DEFAULT_INFO';
const ADD_UNION_OFFICE_INFO = 'unionCreate/ADD_UNION_OFFICE_INFO';
const ADD_UNION_INVEST_INFO = 'unionCreate/ADD_UNION_INVEST_INFO';

const GET_UNION_CREATE_STATE = 'unionCreate/GET_UNION_CREATE_STATE';
const GET_UNION_CREATE_STATE_SUCCESS = 'unionCreate/GET_UNION_CREATE_STATE_SUCCESS';

/* 액션 생성함수 선언 */
export const addExecutiveMemberInfo = (formData) => ({
	type: ADD_EXECUTIVE_MEMBER_INFO,
	unionCreateData: formData,
});
export const addUnionDefaultInfo = (formData) => {
  return {
    type: ADD_UNION_DEFAULT_INFO,
	  unionCreateData: formData,
  }
};
export const addUnionOfficeInfo = (formData) => ({
	type: ADD_UNION_OFFICE_INFO,
	unionCreateData: formData,
});
export const addUnionInvestInfo = (formData) => ({
	type: ADD_UNION_INVEST_INFO,
	unionCreateData: formData,
});

export const getUnionCreateState = () => ({
	type: GET_UNION_CREATE_STATE,
});

export const getUnionCreateStateThunk = () => (dispatch, getState) => {
	dispatch({type: GET_UNION_CREATE_STATE}); // 요청시작
  
  try {
    dispatch({type: GET_UNION_CREATE_STATE_SUCCESS}); // 요청 성공
    return getState().unionCreate;
  } catch (e) {
    console.log(e);
  }

  
  dispatch(getUnionCreateState());
	return Promise.resolve(getState().unoinCreateData);
};

/* 초기 상태 선언 */
const initialState = {};

export default function unionCreate(state = initialState, action) {
	switch (action.type) {
		case ADD_EXECUTIVE_MEMBER_INFO:
			return { ...action.unionCreateData };
		case ADD_UNION_DEFAULT_INFO:
			return { ...state, ...action.unionCreateData };
		case ADD_UNION_OFFICE_INFO:
			return { ...state, ...action.unionCreateData };
    case ADD_UNION_INVEST_INFO:
        return { ...state, ...action.unionCreateData };
		case GET_UNION_CREATE_STATE:
			return {
        ...state,
        status: {
          loading: true,
          error: null
        }
      };
    case GET_UNION_CREATE_STATE_SUCCESS:
      return {
        ...state, 
        status: {
          loading: false,
          error: null
        }
      };
		default:
			return state;
	}
}
