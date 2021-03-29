import { takeEvery } from 'redux-saga/effects';
import { LOAD_USERS, LOAD_USER_INFO, UPDATE_USER_INFO } from '../constants/index';
import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { getUrl, getHeaders } from '../../hooks/useAxios';

import {
  loadUserInfoSuccess,
  loadUserInfoFailed,
  loadUsersSuccess,
  loadUsersFailed,
  updateUserInfoSuccess,
  updateUserInfoFailed,
} from '../actions/userActions';

function* loadUsers(action) {
  try {
    const response = yield call(axios.get, getUrl('users', action.payload), {
      headers: getHeaders(),
    });
    if (action.payload?.isCurrent) {
      yield put(loadUserInfoSuccess(response.data));
    } else {
      yield put(loadUsersSuccess(response.data));
    }
  } catch (error) {
    yield put(loadUsersFailed(error));
  }
}

function* loadUserInfo(action) {
  try {
    const response = yield call(axios.get, getUrl(`users/${action.payload.id}`), {
      headers: getHeaders(),
    });
    yield put(loadUserInfoSuccess(response.data));
  } catch (error) {
    yield put(loadUserInfoFailed(error));
  }
}

function* updateUserInfo(action) {
  try {
    const response = yield call(
      axios.patch,
      getUrl(`users/${action.payload.id}`),
      action.payload.data,
      {
        headers: getHeaders(),
      },
    );
    yield put(updateUserInfoSuccess(response.data));
  } catch (error) {
    yield put(updateUserInfoFailed(error));
  }
}

export default function* createUserWatcher() {
  yield takeEvery(LOAD_USERS, loadUsers);
  yield takeEvery(LOAD_USER_INFO, loadUserInfo);
  yield takeEvery(UPDATE_USER_INFO, updateUserInfo);
}
