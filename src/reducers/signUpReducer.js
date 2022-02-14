import {
  USER_SIGN_UP_REQUEST,
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_FAIL,
} from '../constants/signUpConstants';

export const userSignUpReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGN_UP_REQUEST:
      return { loading: true };
    case USER_SIGN_UP_SUCCESS:
      return { loading: false, signUpInfo: action.payload };
    case USER_SIGN_UP_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
