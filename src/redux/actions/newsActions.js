import { createActions } from 'redux-actions';

import {
  LOAD_ALL_NEWS,
  LOAD_ALL_NEWS_SUCCESS,
  LOAD_ALL_NEWS_FAILED,
  CREATE_NEWS,
  CREATE_NEWS_SUCCESS,
  CREATE_NEWS_FAILED,
  CLEAR_NEWS_ALERT_INFO,
} from '../constants';

export const {
  loadAllNews,
  loadAllNewsSuccess,
  loadAllNewsFailed,
  createNews,
  createNewsSuccess,
  createNewsFailed,
  clearNewsAlertInfo,
} = createActions(
  LOAD_ALL_NEWS,
  LOAD_ALL_NEWS_SUCCESS,
  LOAD_ALL_NEWS_FAILED,
  CREATE_NEWS,
  CREATE_NEWS_SUCCESS,
  CREATE_NEWS_FAILED,
  CLEAR_NEWS_ALERT_INFO,
);
