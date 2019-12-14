const PAGE_PREFIX = "CommitmentChild";
export const ADD_DATA_CHILD = `${PAGE_PREFIX}/ADD_DATA_CHILD`;
export const DELETED_CHILD = `${PAGE_PREFIX}/DELETE_CHILD`;
export const ADD_WEEK_OCCURRENCES = `${PAGE_PREFIX}/ADD_WEEK_OCCURRENCES`;
export const PUSH_OCCURRENCES = `${PAGE_PREFIX}/PUSH_OCCURRENCES`;

export const addData = (data, id) => ({
    type: ADD_DATA_CHILD,
    id,
    data,
});

export const deleteChild = (id) => ({
    type: DELETED_CHILD,
    id,
});

export const addWeekOccurrences = (data, id, key) => ({
    type: ADD_WEEK_OCCURRENCES,
    data,
    id,
    key
});

export const updateOccurrences = (data, id) => ({
    type: PUSH_OCCURRENCES,
    data,
    id
});