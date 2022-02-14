import {
  USER_DROPDOWN_REQUEST,
  USER_DROPDOWN_SUCCESS,
  USER_DROPDOWN_FAIL,
} from '../constants/dropDownConstants';

export const dropDownReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DROPDOWN_REQUEST:
      return { loading: true };
    case USER_DROPDOWN_SUCCESS:
      return { loading: false, dropDownInfo: action.payload };
    case USER_DROPDOWN_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
