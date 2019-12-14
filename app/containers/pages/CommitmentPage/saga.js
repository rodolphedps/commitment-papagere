import { call, put, select } from 'redux-saga/effects';
import { protectedRequestSaga } from 'utils/request';
import { parse } from 'utils/date';
import { makeSelectUserToken } from 'containers/App/selectors';
import { takeLeading } from 'utils/saga-effects';

import { createCommitmentRoutine, loadGrossHourlyRate } from './routines';
import { hourlyRateNetSelector, childcareSelector, parentSelector, nannySelector, morningSelector, eveningSelector, maintenanceSelector, dateSelector } from './selector';

export function* deleteChild(id) {
    try {
        yield put()
      } catch (error) {
        yield put(error.message);
      }
}

export function* getGrossHourlyRate() {
    const requestUrl = `${process.env.PAPAGERE_API_URL}/commitments/get_different_rates`;
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
    };

    try {
        yield put(loadGrossHourlyRate.request());
        const grossHourlyRate = yield call(protectedRequestSaga, requestUrl, options);
        yield put(loadGrossHourlyRate.success(grossHourlyRate));
    } catch (error) {
        yield put (loadGrossHourlyRate.failure(error.message));
    } finally {
        yield put(loadGrossHourlyRate.fulfill())
    }
}

export function* commitmentData() {
    yield takeLeading(createCommitmentRoutine.trigger, createCommitment);
}

export default function* loadGrossHourly() {
    yield takeLeading(loadGrossHourlyRate.trigger, getGrossHourlyRate);
}