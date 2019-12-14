import {
  actionChannel,
  take,
  race,
  all,
  takeLatest,
  call,
  put,
  select
} from 'redux-saga/effects';

import request from 'utils/request';
import { handleConnectedPeopleDataFormatting } from 'containers/App/utils/connectedPeople';
import {
  START_REFRESH_CONNECTED_PEOPLE,
  STOP_REFRESH_CONNECTED_PEOPLE,
  REFRESH_CONNECTED_PEOPLE_REQUEST,
} from './constants';
import {
  makeSelectStarted,
  makeSelectFetching,
} from './selectors';
import {
  makeSelectCurrentUser,
  makeSelectUserToken,
} from '../../selectors';

import {
  refreshConnectPeopleRequest,
  startFetchConnectedPeople,
  refreshConnectedPeopleSuccess,
  refreshConnectedPeopleError,
} from './actions';


export function* loadConnectedPeopleAsync() {
  const started = yield select(makeSelectStarted());
  if (!started) {
    return;
  }

  const currentUser = yield select(makeSelectCurrentUser());
  if (!currentUser) {
    return;
  }

  const token = yield select(makeSelectUserToken());
  if (!token) {
    return;
  }

  const fetching = yield select(makeSelectFetching());
  if (fetching) {
    return;
  }
  yield put(startFetchConnectedPeople());

  const requestURL = `${process.env.PAPAGERE_API_URL}/connected_people`;
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };

  try {
    const connectedPeople = yield call(request, requestURL, options);

    handleConnectedPeopleDataFormatting(connectedPeople);

    yield put(refreshConnectedPeopleSuccess(connectedPeople));
  } catch (response) {
    yield put(refreshConnectedPeopleError(response.error));
  }
}

const wait = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));

export function* refreshConnectedPeopleSaga() {
  const channel = yield actionChannel(START_REFRESH_CONNECTED_PEOPLE);

  while (yield take(channel)) {
    yield put(refreshConnectPeopleRequest());
    while (true) {
      const { stopped } = yield race({
        wait: call(wait, 60000),
        stopped: take(STOP_REFRESH_CONNECTED_PEOPLE),
      });

      if (!stopped) {
        yield put(refreshConnectPeopleRequest());
      } else {
        break;
      }
    }
  }
}

export default function* globalStateRefreshSaga() {
  yield takeLatest(REFRESH_CONNECTED_PEOPLE_REQUEST, loadConnectedPeopleAsync);
  yield all([
    refreshConnectedPeopleSaga(),
  ]);
}
