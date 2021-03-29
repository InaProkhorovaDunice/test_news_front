import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import '../styles/common.scss';
import { Typography } from '@material-ui/core';
import { loadUserInfo } from '../redux/actions/userActions';
import NewsList from './common/newsList';
import ProfileInfo from './common/profileInfo';

const AuthorPage = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const id = match.params.id;
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => dispatch(loadUserInfo({ id })), []);

  return (
    <div className={'main-block'}>
      <ProfileInfo info={userInfo} />
      {userInfo.articles?.length ? (
        <NewsList info={userInfo} />
      ) : (
        <Typography>No news added yet.</Typography>
      )}
    </div>
  );
};

export default React.memo(AuthorPage);
