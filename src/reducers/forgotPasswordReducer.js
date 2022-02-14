import {
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
} from '../constants/forgotPasswordConstants';

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FORGOT_PASSWORD_REQUEST:
      return { loading: true };
    case USER_FORGOT_PASSWORD_SUCCESS:
      return { loading: false, forgotPasswordInfo: action.payload };
    case USER_FORGOT_PASSWORD_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
