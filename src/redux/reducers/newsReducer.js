import { handleActions } from 'redux-actions';
import {
  loadAllNewsSuccess,
  loadAllNewsFailed,
  createNewsSuccess,
  createNewsFailed,
  clearNewsAlertInfo,
} from '../actions/newsActions';

const initialState = {
  allNews: [],
  loadNewsError: '',
  alertInfo: '',
};

const authHandler = {
  [loadAllNewsSuccess]: (state, { payload }) => {
    return { ...state, allNews: payload.data, loadNewsError: '' };
  },
  [loadAllNewsFailed]: (state, { payload }) => {
    return { ...state, loadNewsError: payload.error };
  },
  [createNewsSuccess]: (state) => {
    return {
      ...state,
      alertInfo: {
        type: 'success',
        message: 'The news was successfully created',
      },
    };
  },
  [createNewsFailed]: (state, { payload }) => {
    return { ...state, alertInfo: { type: 'success', message: payload.error } };
  },
  [clearNewsAlertInfo]: (state) => {
    return { ...state, alertInfo: '' };
  },
};

const newsReducer = handleActions(authHandler, initialState);
export default newsReducer;
