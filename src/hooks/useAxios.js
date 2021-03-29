import { apiUrl } from '../config';
import { getLocalStorageItem } from './useLocalStorage';
import queryString from 'query-string';

export const getUrl = (route, paramsObj) => {
  let params = '';
  if (paramsObj) {
    params = `?${queryString.stringify(paramsObj)}`;
  }
  return `${apiUrl}/${route}${params}`;
};

export const getHeaders = () => {
  const accessToken = getLocalStorageItem('access-token');
  const uid = getLocalStorageItem('uid');
  const client = getLocalStorageItem('client');

  return {
    'Access-Control-Allow-Origin': '*/*',
    'Content-Type': 'application/json',
    'access-token': accessToken,
    uid: uid,
    client: client,
  };
};
