/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import { SET_CURRENT_USER } from './constants';
import { REFRESH_CONNECTED_PEOPLE_SUCCESS } from './containers/GlobalStoreRefresher/constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return state
        .set('currentUser', action.user);

    case REFRESH_CONNECTED_PEOPLE_SUCCESS:
      if (!state.get('currentUser')) {
        return state;
      }

      return state
        .setIn(['currentUser', 'connected_people'], action.connectedPeople);

    default:
      return state;
  }
}

export default appReducer;
