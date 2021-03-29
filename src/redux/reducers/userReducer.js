import { handleActions } from 'redux-actions';
import {
  loadUserInfoSuccess,
  loadUserInfoFailed,
  loadUsersSuccess,
  loadUsersFailed,
  updateUserInfoSuccess,
  updateUserInfoFailed,
} from '../actions/userActions';

const initialState = {
  users: [],
  userInfo: {},
  loadUsersError: '',
  loadUserInfoError: '',
};

const authHandler = {
  [loadUsersSuccess]: (state, { payload }) => {
    return { ...state, users: payload.data, loadUsersError: '' };
  },
  [loadUsersFailed]: (state, { payload }) => {
    return { ...state, loadUsersError: payload.error };
  },
  [loadUserInfoSuccess]: (state, { payload }) => {
    return { ...state, userInfo: payload.data, loadUserInfoError: '' };
  },
  [loadUserInfoFailed]: (state, { payload }) => {
    return { ...state, loadUserInfoError: payload.error };
  },
  [updateUserInfoSuccess]: (state, { payload }) => {
    return { ...state, userInfo: payload.data, alertInfo: '' };
  },
  [updateUserInfoFailed]: (state, { payload }) => {
    return { ...state, alertInfo: payload.error };
  },
};

const userReducer = handleActions(authHandler, initialState);
export default userReducer;
