import { combineReducers } from 'redux';
import signup from './signup';
import signin from './signin';
import unionCreate from './unionCreate';
import finding from './finding';

const rootReducer = combineReducers({
  signup,
  signin,
  unionCreate,
  finding,
});

export default rootReducer;
