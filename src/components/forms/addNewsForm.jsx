import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import '../../styles/reactForm.scss';
import { Typography } from '@material-ui/core';
import { createNews } from '../../redux/actions/newsActions';

const classNames = require('classnames');

const AddNewsForm = ({ closeModal }) => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(createNews(data));
    closeModal();
  };

  return (
    <div className={'registration-container'}>
      <form className={classNames('form-block', 'modal-form')} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant={'h4'}>Add your news</Typography>
        <input
          className={'base-input'}
          name="title"
          placeholder={'title'}
          ref={register({ required: true, maxLength: 30 })}
        />
        {errors.title && (
          <span className={'error-text'}>
            This field is required and must be no more than 30 characters.
          </span>
        )}
        <input
          className={'base-input'}
          name="annotation"
          placeholder={'annotation'}
          ref={register({ required: true })}
        />
        {errors.annotation && <span className={'error-text'}>This field is required.</span>}
        <textarea
          className={'base-input'}
          name="text"
          placeholder={'text'}
          ref={register({ required: true })}
        />
        {errors.text && <span className={'error-text'}>This field is required.</span>}
        <input
          className={'base-input'}
          name="hashTags"
          placeholder={'hashtag1, hashtag2, ...'}
          ref={register({ required: true })}
        />
        {errors.hashTags && <span className={'error-text'}>This field is required.</span>}
        <input className={classNames('base-input', 'blue-button')} type="submit" value={'Save'} />
      </form>
    </div>
  );
};

AddNewsForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default React.memo(AddNewsForm);
