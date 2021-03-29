import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/common.scss';
import { Typography } from '@material-ui/core';
import { loadAllNews } from '../redux/actions/newsActions';
import NewsList from './common/newsList';

const MainPage = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.allNews);

  useEffect(() => dispatch(loadAllNews()), []);

  return (
    <div className={'main-block'}>
      {news?.length ? (
        <NewsList info={{ articles: news }} />
      ) : (
        <Typography>No news added yet.</Typography>
      )}
    </div>
  );
};

export default React.memo(MainPage);
