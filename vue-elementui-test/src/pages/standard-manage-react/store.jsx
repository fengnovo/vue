/**
 * Created by chenjiawei1 on 2017/1/11.
 */
import { indexReducer } from './reducer.jsx';
import logger from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// export const store = createStore(indexReducer, composeEnhancers(applyMiddleware(logger)));
export const store = createStore(indexReducer);

