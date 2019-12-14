import { createRoutine } from 'redux-saga-routines';

const PAGE_PREFIX = 'CommitmentPage/';

export const createCommitmentRoutine = createRoutine(`${PAGE_PREFIX}CREATE_COMMITMENT`);
export const loadGrossHourlyRate = createRoutine(`${PAGE_PREFIX}LOAD_GROSS_HOURLY_RATE`);