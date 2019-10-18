import {applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers/rootreducer';
import thunk from 'redux-thunk'
import logger from 'redux-logger';

const middleware = applyMiddleware(thunk, logger)

const store = createStore(rootReducer, middleware);

export default store;