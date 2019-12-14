import {
    fromJS,
} from 'immutable';

import { LOGIN_SUCCESS } from '../LoginPage/constants';

import {
    ADD_CHILD,
    ADD_START_DATE
} from './constants'

import { addChildStore } from './actions';

import { addHourlyRate } from './component/HourlyRate/actions';

import {
    ADD_HOURLY_RATE,
    ADD_HOURLY_RATE_GROSS
} from './component/HourlyRate/actions';

import {
    UPDATE_SCHEDULE,
    UPDATE_DURATION
} from './component/CommitmentScheduleEditor/actions';

import {
    ADD_DATA_CHILD,
    DELETED_CHILD,
    ADD_WEEK_OCCURRENCES,
    PUSH_OCCURRENCES,
} from './component/CommitmentChild/actions';

import {
    ADD_SCHEDULE_CHILD,
    UPDATE_OCCURRENCES
} from './component/CommitmentSchedule/actions';

import {
    ADD_PARENT,
    ADD_NANNY,
    ADD_MORNING_HOUR_LIMIT,
    ADD_EVENING_HOUR_LIMIT,
    ADD_MAINTENANCE_FEE,
} from './component/CommitmentCreation/actions';

import {
    createCommitmentRoutine, loadGrossHourlyRate
} from './routines';
import { createCommitment } from './saga';

const initialState = fromJS({
    childcare: [],
    hourlyRateNet: 0.0,
    hourlyRateGross: 0.0,
    parent: [],
    nanny: [],
    morningHourLimit: 0,
    eveningHourLimit: 0,
    maintenanceFee: 0.0,
    startAt: "DD-MM-YYYY",
    grossToNet: {
        grossHR: 0.0,
        gross: 0.0,
    },
    netToGross: {
        netHR: 0.0,
        net: 0.0
    },
    loading: false,
    error: null,
});

const childcareReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHILD:
            return state.update('childcare', childcare => childcare.push(fromJS(action.payload)));
        case DELETED_CHILD:
            const newChildcare = state.get('childcare').filter(child => {
                return action.id !== child.get('id');
            });
            return state.set('childcare', newChildcare);
        case ADD_HOURLY_RATE:
            return state.set('hourlyRateNet', fromJS(action.hourlyRateNet));
        case ADD_HOURLY_RATE_GROSS:
            return state.set('hourlyRateGross', fromJS(action.hourlyRateGross))
        case UPDATE_SCHEDULE:
            const [ind, instance] = state.get('childcare').findEntry(child => child.get('id') === action.id);
            return state.setIn(['childcare', ind, 'schedule', action.key, 'days'], fromJS(action.data));
        case UPDATE_DURATION:
            const [childcareIndex, childValue] = state.get('childcare').findEntry(child => child.get('id') === action.id);
            return state.setIn(['childcare', childcareIndex, 'schedule', action.key, 'weekDuration'], fromJS(action.data));
        case ADD_DATA_CHILD:
            const [index, child] = state.get('childcare').findEntry(child => child.get('id') === action.id);
            return state.setIn(['childcare', index], child.concat(fromJS(action.data)));
        case ADD_SCHEDULE_CHILD:
            const [indexChild, obj] = state.get('childcare').findEntry(child => child.get('id') === action.id);
            return state.updateIn(['childcare', indexChild, 'schedule'], schedule => schedule.push(fromJS(action.data)));
        case UPDATE_OCCURRENCES:
            const [id, occur] = state.get('childcare').findEntry(child => child.get('id') === action.id);
            return state.updateIn(['childcare', id, 'occurrences']), occurr => occurr.concat(fromJS(action.data));
        case ADD_WEEK_OCCURRENCES:
            const [nb, number] = state.get('childcare').findEntry(child => child.get('id') === action.id);
            return state.setIn(['childcare', nb, 'schedule', action.key, 'weekOccurency'], fromJS(action.data));
        case PUSH_OCCURRENCES:
            const [childIndex, num] = state.get('childcare').findEntry(child => child.get('id') === action.id);
            return state.updateIn(['childcare', childIndex, 'occurrences'], occurrences => occurrences.push(fromJS(action.data)));
        case ADD_PARENT:
            return state.update('parent', parent => parent.push(fromJS(action.data)));
        case ADD_NANNY:
            return state.update('nanny', nanny => nanny.push(fromJS(action.data)));
        case ADD_MORNING_HOUR_LIMIT:
            return state.set('morningHourLimit', fromJS(action.data));
        case ADD_EVENING_HOUR_LIMIT:
            return state.set('eveningHourLimit', fromJS(action.data));
        case ADD_MAINTENANCE_FEE:
            return state.set('maintenanceFee', fromJS(action.data));
        case ADD_START_DATE:
            return state.set('startAt', fromJS(action.data));
        case createCommitmentRoutine.TRIGGER:
            return state;
        case loadGrossHourlyRate.SUCCESS:
            console.log(action.payload);
            return state
                .setIn(['grossToNet', 'grossHR'], action.payload.min_gross_hourly_rate)
                .setIn(['grossToNet', 'gross'], action.payload.normal_time_gross_to_net)
                .setIn(['netToGross', 'netHR'], action.payload.min_net_hourly_rate)
                .setIn(['netToGross', 'net'], action.payload.normal_time_net_to_gross);
        default:
            return state;
    }
}

export default childcareReducer;