import { all } from 'redux-saga/effects';
import user from './userSaga';
import auth from './authSaga';
import news from './newsSaga';

export default function* rootSaga() {
  yield all([user(), auth(), news()]);
}
