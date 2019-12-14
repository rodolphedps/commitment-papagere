/**
 * The global state selectors
 */

import { List, Map } from 'immutable';
import { createSelector } from 'reselect';


export const selectGlobal = (state) => state.global;

export const selectRoute = (state) => state.route;

export const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);

export const makeSelectUserToken = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['currentUser', 'token'])
);

// get all connected people in the same array
export const makeSelectConnectedPeople = () => createSelector(
  selectGlobal,
  makeSelectCurrentUser(),
  (globalState, currentUser) => {
    const children = globalState.getIn(['currentUser', 'connected_people', 'children']) || List();
    const nannies = globalState.getIn(['currentUser', 'connected_people', 'nannies']) || List();
    const users = globalState.getIn(['currentUser', 'connected_people', 'users']) || List();

    return children.concat(nannies).concat(users).push(currentUser);
  }
);

export const makeSelectConnectedPeopleMap = () => createSelector(
  makeSelectConnectedPeople(),
  (connectedPeople) => Map(connectedPeople.map((person) => [person.get('id'), person])),
);

// get all connected child
export const makeSelectConnectedChildren = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['currentUser', 'connected_people', 'children']),
);

export const makeSelectConnectedChildrenMap = () => createSelector(
  makeSelectConnectedChildren(),
  (connectedChildren) => Map(connectedChildren.map((children) => [children.get('id'), children])),
);

export const makeSelectConnectedNanniesMap = () => createSelector(
  selectGlobal,
  (globalState) => {
    const connectedNannies = globalState.getIn(['currentUser', 'connected_people', 'nannies'])
      .map((nanny) => [nanny.get('id'), nanny]);

    return Map(connectedNannies);
  }
);

export const makeSelectConnectedCaresMap = () => createSelector(
  selectGlobal,
  (globalState) => Map(globalState
    .getIn(['currentUser', 'connected_people', 'cares'])
    .map((care) => [care.get('id'), care])
  )
);

export const makeSelectIsNanny = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['currentUser', 'user_type']) === 'nanny_user'
);

export const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

export const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

export const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

