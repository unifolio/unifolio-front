import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './reducers/root';
import reduxLogger from '../middlewares/reduxLogger';

const store = createStore(rootReducer, applyMiddleware(reduxLogger, logger));

export default store;