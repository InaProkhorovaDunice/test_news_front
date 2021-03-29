import { combineReducers } from 'redux';
import user from './userReducer';
import auth from './authReducer';
import news from './newsReducer';

export default combineReducers({
  user,
  auth,
  news,
});
