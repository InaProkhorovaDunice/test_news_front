import { call, put, takeEvery } from 'redux-saga/effects';
import { LOAD_ALL_NEWS, CREATE_NEWS } from '../constants/index';
import {
  loadAllNewsSuccess,
  loadAllNewsFailed,
  createNewsSuccess,
  createNewsFailed,
} from '../actions/newsActions';
import axios from 'axios';
import { getUrl, getHeaders } from '../../hooks/useAxios';

function* loadAllNews(action) {
  try {
    const response = yield call(axios.get, getUrl('articles', action.payload), {
      headers: getHeaders(),
    });
    yield put(loadAllNewsSuccess(response.data));
  } catch (error) {
    yield put(loadAllNewsFailed(error));
  }
}

function* createNews(action) {
  try {
    yield call(axios.post, getUrl('articles'), action.payload, {
      headers: getHeaders(),
    });
    yield put(createNewsSuccess());
  } catch (error) {
    yield put(createNewsFailed(error));
  }
}

export default function* createNewsWatcher() {
  yield takeEvery(LOAD_ALL_NEWS, loadAllNews);
  yield takeEvery(CREATE_NEWS, createNews);
}
