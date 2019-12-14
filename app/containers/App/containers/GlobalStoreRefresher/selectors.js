import { createSelector } from 'reselect';


export const selectGlobalStoreRefresher = (state) => state.globalStoreRefresher;

export const makeSelectStarted = () => createSelector(
  selectGlobalStoreRefresher,
  (globalStoreRefresherState) => globalStoreRefresherState.get('started'),
);

export const makeSelectFetching = () => createSelector(
  selectGlobalStoreRefresher,
  (globalStoreRefresherState) => globalStoreRefresherState.get('fetching'),
);
