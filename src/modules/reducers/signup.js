/* 액션 타입 선언 */
const ADD_IDPW = 'signup/ADD_IDPW';
const ADD_PERSONAL_INFO = 'signup/ADD_PERSONAL_INFO';
const ADD_PHONE = 'signup/ADD_PHONE';
const ADD_AGREEMENT = 'signup/ADD_AGREEMENT';

/* 액션 생성함수 선언 */
export const addIDPW = (formData) => ({
  type: ADD_IDPW,
  signupData: formData
});
export const addPersonalInfo = (formData) => ({
  type: ADD_PERSONAL_INFO,
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

/* 초기 상태 선언 */
const initialState = {};

export default function signup(state = initialState, action) {
  switch (action.type) {
    case ADD_IDPW:
      return {...state, ...action.signupData }
    case ADD_PERSONAL_INFO:
        return {...state, ...action.signupData }
    case ADD_PHONE:
      return {...state, ...action.signupData }
    case ADD_AGREEMENT:
      return {...state, ...action.signupData }
    default:
      return state;
  }
}