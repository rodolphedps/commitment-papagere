import { fromJS } from 'immutable';

import { getUserGradient } from './styleHelper';

export const secureAvatarUrl = (person) => {
  if (!person) {
    return '';
  }

  const url = person.get('avatar') || person.get('avatar_url'); // for children, the property is called avatar_url

  if (url) {
    return url;
  }

  const gradient = getUserGradient(person);

  const nameQueryParam = `?name=${person.get('first_name')}+${person.get('last_name')}`;
  const backgroundQueryParam = gradient ? `&background=${gradient.begin.slice(1)}` : '';
  const colorQueryParam = gradient ? `&color=${gradient.end.slice(1)}` : '';

  return `https://ui-avatars.com/api/${nameQueryParam}${backgroundQueryParam}${colorQueryParam}`;
};

export const secureAvatarUrlFromJs = (person) => secureAvatarUrl(fromJS(person));
