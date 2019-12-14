import { call, put, select } from 'redux-saga/effects';
import { protectedRequestSaga } from 'utils/request';
import { parse } from 'utils/date';
import { makeSelectUserToken } from 'containers/App/selectors';
import { takeLeading } from 'utils/saga-effects';

import { createCommitmentRoutine} from '../../routines';
import { hourlyRateNetSelector, childcareSelector, parentSelector, nannySelector, morningSelector, eveningSelector, maintenanceSelector, dateSelector } from '../../selector';

export function* createCommitment() {

    const storeChildcares = yield select(childcareSelector);
    const storeParents = yield select(parentSelector);
    const storeHourlyRate = yield select(hourlyRateNetSelector);
    const storeNanny = yield select(nannySelector);
    const storeMorning = yield select(morningSelector);
    const storeEvening = yield select(eveningSelector);
    const storeMaintenance = yield select(maintenanceSelector);
    const storeStartDate = yield select(dateSelector);
    console.log("taux" + " " + storeHourlyRate);
    console.log("morning" + " " + storeMorning);
    console.log("evening" + " " + storeEvening);
    console.log("parent" + " " + storeParents);
    console.log("nanny" + " " + storeNanny);
    console.log("maintenance" + " " + storeMaintenance);
    console.log("date de début" + " " + storeStartDate);

    const commitment = {
        childcare: [],
        first_name_parent: storeParents.toJS().slice(-1).pop().firstName,
        last_name_parent: storeParents.toJS().slice(-1).pop().lastName,
        first_name_nanny: storeNanny.toJS().slice(-1).pop().firstName,
        last_name_nanny: storeNanny.toJS().slice(-1).pop().lastName,
        email_parent: storeParents.toJS().slice(-1).pop().email,
        email_nanny: storeNanny.toJS().slice(-1).pop().email,
        hourly_rate: storeHourlyRate,
        morning_hour_limit: storeMorning,
        evening_hour_limit: storeEvening,
        daily_maintenance_fee: storeMaintenance,
        start_at: storeStartDate,
    };

    storeChildcares.map(child => {
        const childcare = {
            first_name_child: child.get('firstName'),
            birthdate_child: child.get('birthdate'),
            vacation_week: child.get('childVacation'),
            nanny_vacation: child.get('nannyVacation'),
            week_duration: child.get('weekDuration'),
        };
        commitment.childcare.push(childcare);
    })
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            commitment
        }),
    };

    const requestUrl = `${process.env.PAPAGERE_API_URL}/commitments/create_commitment`;
    try {
        yield call(protectedRequestSaga, requestUrl, options);
        const commitment = yield put(createCommitmentRoutine.request());
        yield put(createCommitmentRoutine.success(commitment));
      } catch (error) {
        yield put(createCommitmentRoutine.failure(error.message));
      } finally {
        yield put(createCommitmentRoutine.fulfill());
      }
}

export default function* commitmentData() {
    yield takeLeading(createCommitmentRoutine.trigger, createCommitment);
}