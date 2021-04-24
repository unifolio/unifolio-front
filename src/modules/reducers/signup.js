/* 액션 타입 선언 */
const ADD_IDPW = 'signup/ADD_IDPW';
const ADD_PERSONAL_INFO = 'signup/ADD_PERSONAL_INFO';
const ADD_CORPORATION_INFO = 'signup/ADD_CORPORATION_INFO'
const ADD_PHONE = 'signup/ADD_PHONE';
const ADD_AGREEMENT = 'signup/ADD_AGREEMENT';

const GET_SIGNUP_STATE = 'signup/GET_SIGNUP_STATE';
const GET_SIGNUP_STATE_SUCCESS = 'signup/GET_SIGNUP_STATE_SUCCESS';

/* 액션 생성함수 선언 */
export const addIDPW = (formData) => ({
  type: ADD_IDPW,
  signupData: formData
});
export const addPersonalInfo = (formData) => ({
  type: ADD_PERSONAL_INFO,
  signupData: formData
});
export const addCorporationInfo = (formData) => ({
  type: ADD_CORPORATION_INFO,
  signupData: formData
});
export const addPhone = (formData) => ({
  type: ADD_PHONE,
  signupData: formData
});
export const addAgreement = (formData) => ({
  type: ADD_AGREEMENT,
  signupData: formData
});
export const getSignupState = () => ({
  type: GET_SIGNUP_STATE
});

export const getSignupStateThunk = () => (dispatch, getState) => {
  dispatch({type: GET_SIGNUP_STATE}); // 요청시작
  
  try {
    dispatch({type: GET_SIGNUP_STATE_SUCCESS}); // 요청 성공
    return getState().signup;
  } catch (e) {
    console.log(e);
  }
};


/* 초기 상태 선언 */
const initialState = {};

export default function signup(state = initialState, action) {
  switch (action.type) {
    case ADD_IDPW:
      return {...state, ...action.signupData }
    case ADD_PERSONAL_INFO:
      return {...state, ...action.signupData }
    case ADD_CORPORATION_INFO:
      return {...state, ...action.signupData }
    case ADD_PHONE:
      return {...state, ...action.signupData }
    case ADD_AGREEMENT:
      return {...state, ...action.signupData }
    case GET_SIGNUP_STATE:
      return {
        ...state,
        status: {
          loading: true,
          error: null
        }
      }
      case GET_SIGNUP_STATE_SUCCESS:
        return {
          ...state,
          status: {
            loading: false,
            error: null
          }
        }
    default:
      return state;
  }
}