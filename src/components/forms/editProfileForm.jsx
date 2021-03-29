import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import '../../styles/reactForm.scss';
import { Typography } from '@material-ui/core';
import { updateUserInfo } from '../../redux/actions/userActions';
import { validateEmail } from '../../hooks/useValidation';

const classNames = require('classnames');

const EditProfileForm = ({ closeModal, info }) => {
  const { email, nickname, id } = info;
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(updateUserInfo({ id, data }));
    closeModal();
  };

  return (
    <div className={'registration-container'}>
      <form className={classNames('form-block', 'modal-form')} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant={'h4'}>Edit your profile</Typography>
        <input
          className={'base-input'}
          name="nickname"
          placeholder={'nickname'}
          defaultValue={nickname}
          ref={register({ required: true, maxLength: 30 })}
        />
        {errors.title && (
          <span className={'error-text'}>This field must be no more than 30 characters.</span>
        )}
        <input
          className={'base-input'}
          name="email"
          placeholder={'email'}
          defaultValue={email}
          ref={register({ required: true, validate: (value) => validateEmail(value) })}
        />
        {errors.email && (
          <span className={'error-text'}>
            This field is required and must match the format example@service.domen
          </span>
        )}
        <input className={classNames('base-input', 'blue-button')} type="submit" value={'Save'} />
      </form>
    </div>
  );
};

EditProfileForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  info: PropTypes.object.isRequired,
};

export default React.memo(EditProfileForm);
