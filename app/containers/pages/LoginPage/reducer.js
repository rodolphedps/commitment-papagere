/*
 * LoginReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  PASSWORD_FORGOTTEN_ERROR,
  PASSWORD_FORGOTTEN_SUCCESS,
  PASSWORD_FORGOTTEN_REQUEST,
  OPEN_PASSWORD_FORGOTTEN_SUCCESS_MODAL,
  CLOSE_PASSWORD_FORGOTTEN_SUCCESS_MODAL,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  email: '',
  password: '',
  loading: false,
  error: '',
  emailError: '',
  passwordForgottenSuccessModalOpened: false,
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return initialState;

    case CHANGE_EMAIL:
      return state
        .set('email', action.email);

    case CHANGE_PASSWORD:
      return state
        .set('password', action.password);


    case LOGIN_REQUEST:
      return state
        .set('loading', true);

    case LOGIN_SUCCESS:
      return state
        .set('loading', false)
        .set('error', '');

    case LOGIN_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);


    case PASSWORD_FORGOTTEN_REQUEST:
      return state
        .set('loading', true);

    case PASSWORD_FORGOTTEN_SUCCESS:
      return state
        .set('loading', false)
        .set('emailError', '')
        .set('error', '');

    case PASSWORD_FORGOTTEN_ERROR:
      return state
        .set('loading', false)
        .set('emailError', action.error)
        .set('error', '');


    case OPEN_PASSWORD_FORGOTTEN_SUCCESS_MODAL:
      return state
        .set('passwordForgottenSuccessModalOpened', true);

    case CLOSE_PASSWORD_FORGOTTEN_SUCCESS_MODAL:
      return state
        .set('passwordForgottenSuccessModalOpened', false);


    default:
      return state;
  }
}

export default loginReducer;
