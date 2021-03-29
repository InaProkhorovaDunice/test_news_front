import { createActions } from 'redux-actions';

import {
  LOAD_USER_INFO,
  LOAD_USER_INFO_SUCCESS,
  LOAD_USER_INFO_FAILED,
  LOAD_USERS,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILED,
  UPDATE_USER_INFO,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAILED,
} from '../constants';

export const {
  loadUserInfo,
  loadUserInfoSuccess,
  loadUserInfoFailed,
  loadUsers,
  loadUsersSuccess,
  loadUsersFailed,
  updateUserInfo,
  updateUserInfoSuccess,
  updateUserInfoFailed,
} = createActions(
  LOAD_USER_INFO,
  LOAD_USER_INFO_SUCCESS,
  LOAD_USER_INFO_FAILED,
  LOAD_USERS,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILED,
  UPDATE_USER_INFO,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAILED,
);
