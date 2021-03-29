import React from 'react';
import RegistrationForm from '../forms/registrationForm';

const SignInPage = () => {
  return (
    <div>
      <RegistrationForm action={'Sign Up'} link={'sign_in'} />
    </div>
  );
};

export default React.memo(SignInPage);
