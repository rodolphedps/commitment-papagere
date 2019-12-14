const PAGE_PREFIX = "CommitmentCreation";
export const ADD_PARENT = `${PAGE_PREFIX}/ADD_PARENT`;
export const ADD_NANNY = `${PAGE_PREFIX}/ADD_NANNY`;
export const ADD_MORNING_HOUR_LIMIT = `${PAGE_PREFIX}/ADD_MORNING_HOUR_LIMIT`;
export const ADD_EVENING_HOUR_LIMIT = `${PAGE_PREFIX}/ADD_EVENING_HOUR_LIMIT`;
export const ADD_MAINTENANCE_FEE = `${PAGE_PREFIX}/ADD_MAINTENANCE_FEE`;
export const ADD_START_DATE = `${PAGE_PREFIX}/ADD_START_DATE`;

export const addParentInfos = (data) => ({
    type: ADD_PARENT,
    data,
});

export const addNannyInfos = (data) => ({
    type: ADD_NANNY,
    data,
});

export const addMorningHourLimit = (data) => ({
    type: ADD_MORNING_HOUR_LIMIT,
    data,
});

export const addEveningHourLimit = (data) => ({
    type: ADD_EVENING_HOUR_LIMIT,
    data,
});

export const addMaintenanceFee = (data) => ({
    type: ADD_MAINTENANCE_FEE,
    data,
});

export const addStartDate = (data) => ({
    type: ADD_START_DATE,
    data,
})