import {
  USER_CHANGE_PASSWORD_REQUEST,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_CHANGE_PASSWORD_FAIL,
} from '../constants/changePasswordConstants';

export const changePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CHANGE_PASSWORD_REQUEST:
      return { loading: true };
    case USER_CHANGE_PASSWORD_SUCCESS:
      return {
        loading: false,
        changePasswordInfo: action.payload,
      };
    case USER_CHANGE_PASSWORD_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
