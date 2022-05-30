import { applyMiddleware, createStore } from "redux";
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/index';

const logger = createLogger();
const saga = createSagaMiddleware();

const store = createStore(
    rootReducer,
    undefined,
    applyMiddleware(saga, logger)
);

saga.run(rootSaga);

export default store