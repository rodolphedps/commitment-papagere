const PAGE_PREFIX = "HourlyRatePage/";
export const ADD_HOURLY_RATE = `${PAGE_PREFIX}ADD_HOURLY_RATE`;
export const ADD_HOURLY_RATE_GROSS = `${PAGE_PREFIX}ADD_HOURLY_RATE_GROSS`

export const addHourlyRateNet = (hourlyRateNet) => ({
    type: ADD_HOURLY_RATE,
    hourlyRateNet,
});

export const addHourlyRateGross = (hourlyRateGross) => ({
    type: ADD_HOURLY_RATE_GROSS,
    hourlyRateGross,
});