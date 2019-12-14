import { fromJS } from 'immutable';

import {
  START_REFRESH_CONNECTED_PEOPLE,
  STOP_REFRESH_CONNECTED_PEOPLE,
  START_FETCH_CONNECTED_PEOPLE,
  REFRESH_CONNECTED_PEOPLE_REQUEST,
  REFRESH_CONNECTED_PEOPLE_SUCCESS,
  REFRESH_CONNECTED_PEOPLE_ERROR,
} from './constants';


export const startRefreshConnectedPeople = () => ({
  type: START_REFRESH_CONNECTED_PEOPLE,
});

export const stopRefreshConnectedPeople = () => ({
  type: STOP_REFRESH_CONNECTED_PEOPLE,
});

export const startFetchConnectedPeople = () => ({
  type: START_FETCH_CONNECTED_PEOPLE,
});

export const refreshConnectPeopleRequest = () => ({
  type: REFRESH_CONNECTED_PEOPLE_REQUEST,
});

export const refreshConnectedPeopleSuccess = (connectedPeople) => ({
  type: REFRESH_CONNECTED_PEOPLE_SUCCESS,
  connectedPeople: fromJS(connectedPeople),
});

export const refreshConnectedPeopleError = (error) => ({
  type: REFRESH_CONNECTED_PEOPLE_ERROR,
  error,
});
