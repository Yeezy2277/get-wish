import {
  createStore, compose, combineReducers, applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from './reducers/userReducer';
import { genericReducer } from './reducers/genericReducer';
import { wishListReducer } from './reducers/wishListReducer';
import { wishReducer } from './reducers/wishReducer';
import { postsReducer } from './reducers/postsReducer';

const reducer = combineReducers({
  user: userReducer,
  generic: genericReducer,
  wishList: wishListReducer,
  wish: wishReducer,
  posts: postsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
