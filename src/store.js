import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { userLoginReducer } from './reducers/userReducer';
import { userSignUpReducer } from './reducers/signUpReducer';
import { forgotPasswordReducer } from './reducers/forgotPasswordReducer';
import { changePasswordReducer } from './reducers/changePasswordReducer';
import { dropDownReducer } from './reducers/dropDownReducer';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userSignUp: userSignUpReducer,
  forgotPassword: forgotPasswordReducer,
  changePassword: changePasswordReducer,
  dropDown: dropDownReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const dropDownInfoFromStorage = localStorage.getItem('dropDownInfo')
  ? JSON.parse(localStorage.getItem('dropDownInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  dropDown: { dropDownInfo: dropDownInfoFromStorage },
};

const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
