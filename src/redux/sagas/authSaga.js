import { call, takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { apiUrl } from '../../config';
import { REQUEST_SIGN_UP, REQUEST_SIGN_IN, REQUEST_SIGN_OUT } from '../constants/index';
import {
  requestSignInSuccess,
  requestSignInFailed,
  requestSignOutSuccess,
  requestSignOutFailed,
} from '../actions/authActions';
import { getUrl, getHeaders } from '../../hooks/useAxios';

function* requestSignUp(action) {
  try {
    const data = yield call(axios.post, `${apiUrl}/auth`, action.payload, {
      headers: { 'Access-Control-Allow-Origin': '*/*', 'Content-Type': 'application/json' },
    });
    yield put(requestSignInSuccess(data));
  } catch (error) {
    yield put(requestSignInFailed(error));
  }
}

function* requestSignIn(action) {
  try {
    const data = yield call(axios.post, `${apiUrl}/auth/sign_in`, action.payload, {
      headers: { 'Access-Control-Allow-Origin': '*/*', 'Content-Type': 'application/json' },
    });
    yield put(requestSignInSuccess(data));
  } catch (error) {
    if (error.response) {
      yield put(requestSignInFailed(error.response));
    }
  }
}

function* requestSignOut() {
  try {
    yield call(axios.delete, getUrl('auth/sign_out'), {
      headers: getHeaders(),
    });
    yield put(requestSignOutSuccess());
  } catch (error) {
    yield put(requestSignOutFailed(error));
  }
}

export default function* createAuthWatcher() {
  yield takeEvery(REQUEST_SIGN_UP, requestSignUp);
  yield takeEvery(REQUEST_SIGN_IN, requestSignIn);
  yield takeEvery(REQUEST_SIGN_OUT, requestSignOut);
}
