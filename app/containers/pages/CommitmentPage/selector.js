import { createSelector } from 'reselect';

export const commitmentPageStateSelector = (state) => state.commitmentPage;

export const childcareSelector = createSelector(
  commitmentPageStateSelector,
  (childcarePage) => {
    const childcare = childcarePage.get('childcare');
    return childcare;
  }
)

export const hourlyRateNetSelector = createSelector(
  commitmentPageStateSelector,
  (childcarePage) => {
    const hourlyRateNet = childcarePage.get('hourlyRateNet');
    return hourlyRateNet;
  }
)

export const hourlyRateGrossSelector = createSelector(
  commitmentPageStateSelector,
  (childcarePage) => {
    const hourlyRateGross = childcarePage.get('hourlyRateGross');
    return hourlyRateGross;
  }
)

export const loadingSelector = createSelector(
  commitmentPageStateSelector,
  (commitmentPageState) => commitmentPageState.get('loading'),
);

export const errorSelector = createSelector(
  commitmentPageStateSelector,
  (commitmentPageState) => commitmentPageState.get('error'),
);

export const parentSelector = createSelector(
  commitmentPageStateSelector,
  (childcarePage) => {
    const parent = childcarePage.get('parent');
    return parent;
  }
)

export const nannySelector = createSelector(
  commitmentPageStateSelector,
  (childcarePage) => {
    const nanny = childcarePage.get('nanny');
    return nanny;
  }
)

export const morningSelector = createSelector(
  commitmentPageStateSelector,
  (childcarePage) => {
    const morning = childcarePage.get('morningHourLimit');
    return morning;
  }
)

export const eveningSelector = createSelector(
  commitmentPageStateSelector,
  (childcarePage) => {
    const evening = childcarePage.get('eveningHourLimit');
    return evening;
  }
)

export const maintenanceSelector = createSelector(
  commitmentPageStateSelector,
  (childcarePage) => {
    const maintenance = childcarePage.get('maintenanceFee');
    return maintenance;
  }
)

export const dateSelector = createSelector(
  commitmentPageStateSelector,
  (childcarePage) => {
    const date = childcarePage.get('startAt');
    return date;
  }
)

export const hourlyRateGross = createSelector(
  commitmentPageStateSelector,
  (childcarePage) => {
    const rate = childcarePage.getIn(['grossToNet', 'gross']);
    return rate;
  }
)

export const hourlyRateNet = createSelector(
  commitmentPageStateSelector,
  (childcarePage) => {
    const rate = childcarePage.getIn(['netToGross', 'net']);
    return rate;
  }
)

export const minHourlyRateNet = createSelector(
  commitmentPageStateSelector,
  (childcarePage) => {
    const rate = childcarePage.getIn(['netToGross', 'netHR']);
    return rate;
  }
)