import { call, take, fork } from 'redux-saga/effects';

export const takeLeading = (patternOrChannel, saga, ...args) => fork(function* () {
  while (true) {
    const action = yield take(patternOrChannel);
    yield call(saga, ...args.concat(action));
  }
});
