import {
  USER_CHANGE_PASSWORD_REQUEST,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_CHANGE_PASSWORD_FAIL,
} from '../constants/changePasswordConstants';

import axios from 'axios';

export const changePasswordAction =
  (old_password, password, password_confirmation, callback) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_CHANGE_PASSWORD_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        // 'https://tmbo.technerdstesting.net/api/change-password',
        `${process.env.REACT_APP_API_URL}/change-password`,
        {
          old_password,
          password,
          password_confirmation,
        },
        config
      );
      dispatch({
        type: USER_CHANGE_PASSWORD_SUCCESS,
        payload: data,
      });
      callback();
    } catch (error) {
      dispatch({
        type: USER_CHANGE_PASSWORD_FAIL,
        payload: error,
        // error.response && error.response.data.message
        //   ? error.response.data.message
        //   : error.message,
      });
    }
  };
