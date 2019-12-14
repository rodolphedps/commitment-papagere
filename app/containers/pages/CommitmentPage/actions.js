import { fromJS } from 'immutable';

import {
    ADD_CHILD,
    DELETE_CHILD,
    ADD_START_DATE
} from './constants';

export const addChildStore = (childcare) => ({
    type: ADD_CHILD,
    payload: childcare,
});

export const createCommitmentSuccess = () => ({
    type: CREATE_COMMITMENT_SUCCES,
});

export const deleteChild = (id) => ({
    type: DELETE_CHILD,
    id
})

export const addStartDate = (data) => ({
    type: ADD_START_DATE,
    data,
})