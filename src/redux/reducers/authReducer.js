import { handleActions } from 'redux-actions';
import { setLocalStorageItem, clearLocalStorage } from '../../hooks/useLocalStorage';
import {
  requestSignInSuccess,
  requestSignInFailed,
  requestSignOutSuccess,
  requestSignOutFailed,
} from '../actions/authActions';

const initialState = {
  userInfo: {},
  registrationError: '',
};

const authHandler = {
  [requestSignInSuccess]: (state, { payload }) => {
    setLocalStorageItem('client', payload.headers.client);
    setLocalStorageItem('access-token', payload.headers['access-token']);
    setLocalStorageItem('uid', payload.headers.uid);
    return { ...state, userInfo: payload.data, registrationError: '' };
  },
  [requestSignInFailed]: (state, { payload }) => {
    return { ...state, registrationError: payload.data.errors.join('.') };
  },
  [requestSignOutSuccess]: (state) => {
    clearLocalStorage();
    return { ...state, userInfo: {}, registrationError: '' };
  },
  [requestSignOutFailed]: (state, { error }) => {
    return { ...state, registrationError: error.message };
  },
};

const authReducer = handleActions(authHandler, initialState);
export default authReducer;
