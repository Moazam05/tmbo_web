import axios from 'axios';
import { toast } from 'react-toastify';

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from '../constants/userConstants';

export const login = (email, password, callback) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      // 'https://tmbo.technerdstesting.net/api/login',
      `${process.env.REACT_APP_API_URL}/login`,
      { email, password },
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
    if (data.message === 'Logged In Successfully!') {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    if (data.status === true) {
      callback();
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error,
      // error.response && error.response.data.message
      //   ? error.response.data.message
      //   : error.message,
    });
  }
};

export const userLogoutAction = (callback) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.log('dala', userInfo);

    const { data } = await axios.get(
      // 'https://tmbo.technerdstesting.net/api/logout',
      `${process.env.REACT_APP_API_URL}/logout`,

      config
    );
    dispatch({
      type: USER_LOGOUT,
      payload: data,
    });
    if (data.status) {
      callback();
    }
  } catch (error) {}
};
