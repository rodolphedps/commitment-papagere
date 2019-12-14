import { fromJS } from 'immutable';

import {
  START_REFRESH_CONNECTED_PEOPLE,
  STOP_REFRESH_CONNECTED_PEOPLE,
  START_FETCH_CONNECTED_PEOPLE,
  REFRESH_CONNECTED_PEOPLE_ERROR,
  REFRESH_CONNECTED_PEOPLE_SUCCESS
} from './constants';


const initialState = fromJS({
  started: false,
  fetching: false,
  error: null,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_REFRESH_CONNECTED_PEOPLE:
      return state
        .set('started', true);

    case STOP_REFRESH_CONNECTED_PEOPLE:
      return state
        .set('started', false);

    case START_FETCH_CONNECTED_PEOPLE:
      return state
        .set('fetching', true);

    case REFRESH_CONNECTED_PEOPLE_SUCCESS:
      return state
        .set('fetching', false)
        .set('error', null);

    case REFRESH_CONNECTED_PEOPLE_ERROR:
      return state
        .set('fetching', false)
        .set('error', action.error);

    default:
      return state;
  }
};

export default reducer;
