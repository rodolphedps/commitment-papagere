import { fromJS } from 'immutable';

import { secureAvatarUrlFromJs } from 'utils/avatars';
import { getColorThemeBackgroundFromJs } from 'utils/styleHelper';
import { getTokenFromLocalStorage } from 'utils/localStorage/access-token';
import { SET_CURRENT_USER } from './constants';
import { handleConnectedPeopleDataFormatting } from './utils/connectedPeople';

/**
 * Dispatched when the user logs in
 *
 * @param  {object} user The current user
 *
 * @return {object}      An action object with a type of SET_CURRENT_USER passing the user
 */
export function setCurrentUser(user) {
  const token = getTokenFromLocalStorage();

  if (user) {
    handleConnectedPeopleDataFormatting(user.connected_people);
  }

  return {
    type: SET_CURRENT_USER,
    user: user ? fromJS({
      ...user,
      avatarUrl: secureAvatarUrlFromJs(user),
      backgroundTheme: getColorThemeBackgroundFromJs(user),
      token
    }) : user,
  };
}
