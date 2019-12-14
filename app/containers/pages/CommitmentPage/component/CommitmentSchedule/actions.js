const PAGE_PREFIX = "CommitmentSchedule";
export const ADD_SCHEDULE_CHILD = `${PAGE_PREFIX}/ADD_SCHEDULE_CHILD`;
export const UPDATE_OCCURRENCES = `${PAGE_PREFIX}/UPDATE_OCCURRENCES`

export const addSchedule = (data, id) => ({
    type: ADD_SCHEDULE_CHILD,
    data,
    id
});

export const updateOccurrences = (data, id) => ({
    type: UPDATE_OCCURRENCES,
    data,
    id
});

