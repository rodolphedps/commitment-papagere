/*
 * Login Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  PASSWORD_FORGOTTEN_REQUEST,
  PASSWORD_FORGOTTEN_SUCCESS,
  PASSWORD_FORGOTTEN_ERROR,
  OPEN_PASSWORD_FORGOTTEN_SUCCESS_MODAL,
  CLOSE_PASSWORD_FORGOTTEN_SUCCESS_MODAL,
} from './constants';

/**
 * Request to log the user in
 *
 * @param  {email} email The new email text of the input field
 * @param  {password} password The new password text of the input field
 *
 * @return {object}    An action object with a type of LOGIN_REQUEST
 */
export function loginRequest(email, password) {
  return {
    type: LOGIN_REQUEST,
    email,
    password,
  };
}

/**
 * User's login request succeed
 *
 * @param  {token} token The user token
 *
 * @return {object}    An action object with a type of LOGIN_SUCCESS
 */
export function loginSuccess(token) {
  return {
    type: LOGIN_SUCCESS,
    token,
  };
}

/**
 * User's login request failed
 *
 * @param  {error} error The error message
 *
 * @return {object}    An action object with a type of LOGIN_ERROR
 */
export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}

/**
 * Email input text change
 *
 * @param  {email} email The email text
 *
 * @return {object}    An action object with a type of CHANGE_EMAIL
 */
export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}

/**
 * Password input text change
 *
 * @param  {password} password The email text
 *
 * @return {object}    An action object with a type of CHANGE_PASSWORD
 */
export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}

export const passwordForgotten = () => ({
  type: PASSWORD_FORGOTTEN_REQUEST,
});

export const passwordForgottenSuccess = () => ({
  type: PASSWORD_FORGOTTEN_SUCCESS,
});

export const passwordForgottenError = (error) => ({
  type: PASSWORD_FORGOTTEN_ERROR,
  error
});


export const openPasswordForgottenSuccessModal = () => ({
  type: OPEN_PASSWORD_FORGOTTEN_SUCCESS_MODAL,
});

export const closePasswordForgottenSuccessModal = () => ({
  type: CLOSE_PASSWORD_FORGOTTEN_SUCCESS_MODAL,
});
