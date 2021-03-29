import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { upperFirst } from 'lodash';
import { useForm } from 'react-hook-form';
import { getLocalStorageItem } from '../../hooks/useLocalStorage';
import '../../styles/registration.scss';
import '../../styles/reactForm.scss';
import { Typography } from '@material-ui/core';
import { validateEmail } from '../../hooks/useValidation';
import { requestSignUp, requestSignIn } from '../../redux/actions/authActions';

const classNames = require('classnames');

const RegistrationForm = ({ action, link }) => {
  const { register, handleSubmit, errors } = useForm();
  const navigation = useHistory();
  const dispatch = useDispatch();
  const label = upperFirst(link.replace('_', ' '));
  const registrationError = useSelector((state) => state.auth.registrationError);

  const onSubmit = (data) => {
    dispatch(action === 'Sign In' ? requestSignIn(data) : requestSignUp(data));
    setTimeout(() => mainRedirect(), 1000);
  };

  const mainRedirect = () => {
    if (!registrationError) {
      const uid = getLocalStorageItem('uid');
      if (uid) {
        navigation.push('/');
      }
    }
  };

  return (
    <div className={'registration-container'}>
      <form className={'form-block'} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant={'h4'}>{action}</Typography>
        {registrationError && <Typography className={'error-text'}>{registrationError}</Typography>}
        <input
          className={'base-input'}
          name="email"
          placeholder={'email'}
          ref={register({ required: true, validate: (value) => validateEmail(value) })}
        />
        {errors.email && (
          <span className={'error-text'}>
            This field is required and must match the format example@service.domen
          </span>
        )}
        <input
          className={'base-input'}
          name="password"
          placeholder={'password'}
          ref={register({ required: true, minLength: 6 })}
        />
        {errors.password && (
          <span className={'error-text'}>
            This field is required and must contain at least 6 characters.
          </span>
        )}
        <input className={classNames('base-input', 'blue-button')} type="submit" value={action} />
        <Link to={link}>{label}</Link>
      </form>
    </div>
  );
};

RegistrationForm.propTypes = {
  action: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default React.memo(RegistrationForm);
