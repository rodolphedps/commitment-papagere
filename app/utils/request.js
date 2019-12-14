import { push } from 'react-router-redux';
import { call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { TRANSLATIONS } from 'translations';
import { setTokenInLocalStorage } from './localStorage';
import { setCurrentUser } from '../containers/App/actions';
import { logToSentry, handleUnauthorizedRequest } from './exceptionHelper';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response, url, requestOptions) {
  if (!response) {
    return null;
  }

  const { status } = response;

  if (status >= 200 && status < 300) {
    return response;
  }

  if (status === 401) {
    handleUnauthorizedRequest();
    return null;
  }

  if (!response.ok) {
    logToSentry(new Error(`API ${response.status} on ${requestOptions.method} ${url}`), {
      requestConfig: requestOptions,
      message: response.statusText,
      headers: response.headers
    });
  }

  if (status >= 500 && status < 600) {
    toast.error(TRANSLATIONS.shared.defaultServerErrorMessage);
  }

  throw response;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, requestOptions, options = { parseJson: true }) {
  return fetch(url, requestOptions)
    .then((res) => checkStatus(res, url, requestOptions))
    .then(options.parseJson ? parseJSON : (response) => response);
}

export function* protectedRequestSaga(url, requestOptions, options) {
  let responseBody = null;

  try {
    responseBody = yield call(request, url, requestOptions, options);
  } catch (response) {
    if (response.status === 401) {
      yield put(setCurrentUser(null));
      yield put(push('/'));
    } else {
      const error = yield call(parseJSON, response);
      throw error || response;
    }
  }
  return responseBody;
}

/**
 * Requests a URL, retreive the headers to store user auth token in the local storage, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export async function authAndStoreToken(url, options) {
  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.json();
    throw Error(error.error);
  }

  const { headers } = response;

  setTokenInLocalStorage(headers);
  return response.json();
}
