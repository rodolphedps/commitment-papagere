import { fromJS } from 'immutable';
import { CHILD_GRADIENTS, USER_GRADIENTS } from 'constants/colors';

const fontSize = 16;

export const calcRem = (pixel) =>
  `${pixel / fontSize}rem`;

export const checkChild = (person) =>
  person.has('child_color')
  && person.get('child_color') !== null
  && person.get('child_color') !== undefined;

export const getPersonThemeId = (person) => {
  if (!person) {
    return '0';
  }

  const isChild = checkChild(person);

  const themeId = isChild ? person.get('child_color') : person.get('user_color');

  return themeId || '0';
};

export const getColorThemeBackground = (person) => {
  if (!person) {
    return 'dark-gray-background';
  }

  const isChild = checkChild(person);

  const themeId = getPersonThemeId(person);

  return `${isChild ? 'child' : 'user'}-theme-bg-${themeId}`;
};

export const getColorThemeBackgroundFromJs = (person) => getColorThemeBackground(fromJS(person));

export const getUserGradient = (person) => {
  const isChild = checkChild(person);

  const gradientsPool = isChild ? CHILD_GRADIENTS : USER_GRADIENTS;
  return gradientsPool[getPersonThemeId(person)];
};
