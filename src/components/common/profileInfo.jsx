import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import '../../styles/common.scss';
import { Typography, Avatar } from '@material-ui/core';
import { loadAllNews } from '../../redux/actions/newsActions';

const ProfileInfo = (props) => {
  const { email, nickname } = props.info;
  const dispatch = useDispatch();

  useEffect(() => dispatch(loadAllNews()), []);

  return (
    <div className={'info-container'}>
      <div className={'avatar-block'}>
        <Avatar alt="Remy Sharp" src={'https://avatarko.ru/img/kartinka/1/zhivotnye_kotenok.jpg'} />
      </div>
      <div className={'data-block'}>
        {nickname && <Typography>{nickname}</Typography>}
        <Typography>{email}</Typography>
      </div>
    </div>
  );
};

ProfileInfo.propTypes = {
  info: PropTypes.object.isRequired,
};

export default React.memo(ProfileInfo);
