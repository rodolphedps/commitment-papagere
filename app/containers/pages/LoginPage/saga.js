/**
 * Handle login requests
 */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import IsEmail from 'isemail';

import request, { authAndStoreToken } from 'utils/request';
import { LOGIN_REQUEST, PASSWORD_FORGOTTEN_REQUEST } from './constants';
import { loginSuccess, loginError, passwordForgottenError, passwordForgottenSuccess, openPasswordForgottenSuccessModal } from './actions';
import { setCurrentUser } from '../../App/actions';
import { TRANSLATIONS } from '../../../translations';
import { emailSelector, passwordSelector } from './selectors';

/**
 * Login request/response handler
 */
export function* login() {
  // Select email and password from store
  const email = yield select(emailSelector);
  const password = yield select(passwordSelector);
  const requestURL = `${process.env.PAPAGERE_API_URL}/login`;

  try {
    // Call our request helper (see 'utils/request')
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { email, password } })
    };
    const user = yield call(authAndStoreToken, requestURL, options);

    const { children, nannies, users } = user.connected_people;

    if (children) {
      children
        .forEach((child) => child.isChild = true); // eslint-disable-line
    }

    if (nannies) {
      nannies
        .forEach((nanny) => nanny.isNanny = true); // eslint-disable-line
    }

    if (users) {
      users
        .forEach((user) => user.isUser = true); // eslint-disable-line
    }

    // also set isUser or isNanny property on the connected user
    if (user.user_type === 'nanny_user') {
      user.isNanny = true;
    } else {
      user.isUser = true;
    }

    yield put(loginSuccess(user));
    yield put(setCurrentUser(user));
  } catch (response) {
    let errorMessage = '';
    if (response && response.message) {
      errorMessage = response.message;
    }

    if (!errorMessage) {
      errorMessage = TRANSLATIONS.sign_in.defaultErrorMessage;
    }

    yield put(loginError(errorMessage));
  }
}


function* passwordForgotten() {
  const email = yield select(emailSelector);

  if (!IsEmail.validate(email || '', { minDomainAtoms: 2 })) {
    yield put(passwordForgottenError('Ce champ est obligatoire'));
    return;
  }

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        email,
      },
    }),
  };

  const requestURL = `${process.env.PAPAGERE_API_URL}/password`;

  try {
    const response = yield call(request, requestURL, options);

    yield all([
      put(passwordForgottenSuccess(response)),
      put(openPasswordForgottenSuccessModal()),
    ]);
  } catch (error) {
    yield put(passwordForgottenError(error));
  }
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* loginData() {
  yield all([
    takeLatest(LOGIN_REQUEST, login),
    takeLatest(PASSWORD_FORGOTTEN_REQUEST, passwordForgotten),
  ]);
}
