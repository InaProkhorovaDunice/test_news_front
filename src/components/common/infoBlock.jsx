import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';
import '../../styles/common.scss';
import { clearNewsAlertInfo, loadAllNews } from '../../redux/actions/newsActions';

const InfoBlock = ({ info }) => {
  const { type, message } = info;
  const dispatch = useDispatch();

  const clearAlertInfo = () => {
    dispatch(clearNewsAlertInfo());
    dispatch(loadAllNews({ isCurrent: true }));
  };

  return (
    <div className={'alert-block'}>
      <Alert severity={type} onClose={clearAlertInfo}>
        {message}
      </Alert>
    </div>
  );
};

InfoBlock.propTypes = {
  info: PropTypes.object.isRequired,
};

export default React.memo(InfoBlock);
