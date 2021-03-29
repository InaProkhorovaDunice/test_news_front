import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  link: {
    cursor: 'pointer',
    color: theme.palette.info.dark,
    textDecoration: 'underline',
  },
}));

const NewsCard = ({ author, news }) => {
  const navigation = useHistory();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const authorPageRedirect = async () => {
    navigation.push(`/authors/${news.user_id}`);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title={news.title}
        subheader={<Typography className={classes.link}>{author}</Typography>}
        onClick={authorPageRedirect}
      />
      <CardMedia
        className={classes.media}
        image="https://avatarko.ru/img/kartinka/30/zhivotnye_lisa_29235.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {news.annotation}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {news.hashTags}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{news.text}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

NewsCard.propTypes = {
  author: PropTypes.string.isRequired,
  news: PropTypes.object.isRequired,
};

export default React.memo(NewsCard);
