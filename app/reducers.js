/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { LOCATION_CHANGE } from 'react-router-redux';
import immutableTransform from 'redux-persist-transform-immutable';
import storage from 'redux-persist/lib/storage';

import globalReducer from 'containers/App/reducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  location: null,
});

const persistConfig = {
  key: 'root',
  storage,
  transforms: [
    immutableTransform({
      whitelist: [
        'global',
        'route',
        'commitmentPage',
      ],
    }),
  ],
  throttle: 250,
  debug: process.env !== 'production',
  whitelist: [
    'global',
    'route',
    'commitmentPage',
  ],
};

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  const appReducer = combineReducers({
    route: routeReducer,
    global: globalReducer,
    ...injectedReducers,
  });

  const rootReducer = (state, action) => {
    if (action.type === 'RESET_APP') {
      state = undefined;
    }

    return appReducer(state, action);
  };

  return persistReducer(persistConfig, rootReducer);
}
