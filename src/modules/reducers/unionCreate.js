/* 액션 타입 선언 */
// const ADD_SCHOOL = 'unionCreate/ADD_SCHOOL';
const ADD_PERSONAL_INFO = 'unionCreate/ADD_PERSONAL_INFO';
const ADD_PHONE = 'unionCreate/ADD_PHONE';
const ADD_AGREEMENT = 'unionCreate/ADD_AGREEMENT';

/* 액션 생성함수 선언 */
// export const addSchool = (formData) => ({
//   type: ADD_SCHOOL,
//   signupData: formData
// });
export const addPersonalInfo = (formData) => ({
  type: ADD_PERSONAL_INFO,
  unionCreateData: formData
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
    // case ADD_IDPW:
    //   return {...state, ...action.signupData }
    case ADD_PERSONAL_INFO:
        return {...state, ...action.unionCreateData }
    case ADD_PHONE:
      return {...state, ...action.signupData }
    case ADD_AGREEMENT:
      return {...state, ...action.signupData }
    default:
      return state;
  }
}