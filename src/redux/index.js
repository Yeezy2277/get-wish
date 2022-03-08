import {
  createStore, compose, combineReducers, applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from './reducers/userReducer';
import { genericReducer } from './reducers/genericReducer';

const reducer = combineReducers({
  user: userReducer,
  generic: genericReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
