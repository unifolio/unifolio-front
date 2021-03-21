import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/root';
// import reduxLogger from '../middlewares/reduxLogger';

const store = createStore(rootReducer, 
  composeWithDevTools(applyMiddleware(ReduxThunk, logger))
);

export default store;