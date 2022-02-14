import {
  USER_SIGN_UP_REQUEST,
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_FAIL,
} from '../constants/signUpConstants';

import axios from 'axios';

export const signUp =
  (
    first_name,
    last_name,
    email,
    phone_number,
    password,
    password_confirmation,
    role_id
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_SIGN_UP_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        // 'https://tmbo.technerdstesting.net/api/register',
        `${process.env.REACT_APP_API_URL}/register`,
        {
          first_name,
          last_name,
          email,
          phone_number,
          password,
          password_confirmation,
          role_id,
        },
        config
      );
      dispatch({
        type: USER_SIGN_UP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_SIGN_UP_FAIL,
        payload: error,
        // error.response && error.response.data.message
        //   ? error.response.data.message
        //   : error.message,
      });
    }
  };
