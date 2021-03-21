/* 액션 타입 선언 */
const ADD_USER_DATA = 'signin/ADD_USER_DATA';
const GET_SIGNINSTATE = 'signin/GET_SIGNINSTATE';

/* 액션 생성함수 선언 */
export const addUserData = (payload) => ({
	type: ADD_USER_DATA,
	user: payload.data,
});
export const getSigninState = () => ({
	type: GET_SIGNINSTATE,
});

export const getSigninStateThunk = () => (dispatch, getState) => {
	dispatch(getSigninState());
	return Promise.resolve(getState().signin);
};

/* 초기 상태 선언 */
const initialState = {};

export default function signin(state = initialState, action) {
	switch (action.type) {
		case ADD_USER_DATA:
			return { ...action.user };
		case GET_SIGNINSTATE:
			return state;
		default:
			return state;
	}
}
