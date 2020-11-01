import { combineReducers } from 'redux';
import signup from './signup';
import unionCreate from './unionCreate';

const rootReducer = combineReducers({
  signup,
  unionCreate
});

export default rootReducer;


