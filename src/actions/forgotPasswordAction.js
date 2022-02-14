import {
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
} from '../constants/forgotPasswordConstants';

import axios from 'axios';

export const forgotPasswordAction = (email) => async (dispatch) => {
  try {
    dispatch({
      type: USER_FORGOT_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      // 'https://tmbo.technerdstesting.net/api/forget-password',
      `${process.env.REACT_APP_API_URL}/forget-password`,
      {
        email,
      },
      config
    );
    dispatch({
      type: USER_FORGOT_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_FORGOT_PASSWORD_FAIL,
      payload: error,
      // error.response && error.response.data.message
      //   ? error.response.data.message
      //   : error.message,
    });
  }
};
