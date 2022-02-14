import {
  USER_DROPDOWN_REQUEST,
  USER_DROPDOWN_SUCCESS,
  USER_DROPDOWN_FAIL,
} from '../constants/dropDownConstants';

import axios from 'axios';

export const dropDownAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DROPDOWN_REQUEST,
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

    const { data } = await axios.get(
      // 'https://tmbo.technerdstesting.net/api/boats/dropdowns',
      `${process.env.REACT_APP_API_URL}/boats/dropdowns`,

      config
    );
    dispatch({
      type: USER_DROPDOWN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('dropDownInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_DROPDOWN_FAIL,
      payload: error,
      // error.response && error.response.data.message
      //   ? error.response.data.message
      //   : error.message,
    });
  }
};
