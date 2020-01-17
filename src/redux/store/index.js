import { createStore, applyMiddleware } from "redux";
import { createLogger } from 'redux-logger'
import createSagaMiddleware from "redux-saga"
import reducer from "../reducer";
import sage from "../saga";

const loggerMiddleWare = createLogger()
const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(sagaMiddleware, loggerMiddleWare));
sagaMiddleware.run(sage)

export default store