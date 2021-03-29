import { createActions } from 'redux-actions';

import {
  REQUEST_SIGN_UP,
  REQUEST_SIGN_IN,
  REQUEST_SIGN_IN_SUCCESS,
  REQUEST_SIGN_IN_FAILED,
  REQUEST_SIGN_OUT,
  REQUEST_SIGN_OUT_SUCCESS,
  REQUEST_SIGN_OUT_FAILED,
} from '../constants';

export const {
  requestSignUp,
  requestSignIn,
  requestSignInSuccess,
  requestSignInFailed,
  requestSignOut,
  requestSignOutSuccess,
  requestSignOutFailed,
} = createActions(
  REQUEST_SIGN_UP,
  REQUEST_SIGN_IN,
  REQUEST_SIGN_IN_SUCCESS,
  REQUEST_SIGN_IN_FAILED,
  REQUEST_SIGN_OUT,
  REQUEST_SIGN_OUT_SUCCESS,
  REQUEST_SIGN_OUT_FAILED,
);
