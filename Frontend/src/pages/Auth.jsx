import React, { useState } from 'react'
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginUser';

const Auth = () => {
    const [flag, setFlag] = useState(true);

  return (
      <div>
      {flag ? (
        <RegisterForm setFlag={setFlag} />
      ) : (
        <LoginForm setFlag={setFlag} />
      )}
    </div>
  )
}

export default Auth;