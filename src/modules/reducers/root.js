import { combineReducers } from 'redux';
import signup from './signup';
import signin from './signin';
import unionCreate from './unionCreate';

const rootReducer = combineReducers({
	signup,
	signin,
	unionCreate,
});

export default rootReducer;
