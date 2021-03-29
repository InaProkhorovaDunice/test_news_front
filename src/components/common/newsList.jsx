import React from 'react';
import { Grid } from '@material-ui/core';
import NewsCard from './newsCard';
import PropTypes from 'prop-types';

const NewsList = ({ info }) => {
  const { nickname, email, articles } = info;

  const getAuthorName = (author) => {
    if (author) {
      return author.nickname || author.email;
    } else {
      return nickname || email;
    }
  };

  return (
    <div>
      <Grid container spacing={3}>
        {articles?.map((el) => (
          <Grid item xs={3} key={el.id}>
            <NewsCard author={getAuthorName(el.user)} news={el} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

NewsList.propTypes = {
  info: PropTypes.object.isRequired,
};

export default React.memo(NewsList);
