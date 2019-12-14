const PAGE_PREFIX = "CommitmentScheduleEditor";
export const UPDATE_SCHEDULE = `${PAGE_PREFIX}/UPDATE_SCHEDULE`;
export const UPDATE_DURATION = `${PAGE_PREFIX}/UPDATE_DURATION`

export const updateSchedule = (data, id, key) => ({
    type: UPDATE_SCHEDULE,
    data,
    id,
    key
});

export const updateDuration = (data, id, key) => ({
    type: UPDATE_DURATION,
    data,
    id,
    key
});