import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers/';

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
};

const store = applyMiddleware(...middleware)(createStore)(reducer);

export default store; 
