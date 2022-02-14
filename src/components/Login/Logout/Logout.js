import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { userLogoutAction } from '../../../actions/userAction';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(userLogoutAction());
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  return (
    <div>
      <Button onClick={logoutHandler}>Logout</Button>
    </div>
  );
};

export default Logout;
