const ACCESS_TOKEN_KEY = 'accessToken';

const getAuthorizationTokenFromHeaders = (headers) => headers.get('Authorization');

export const setTokenInLocalStorage = (headers) => {
  const token = getAuthorizationTokenFromHeaders(headers);
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getTokenFromLocalStorage = () => localStorage.getItem(ACCESS_TOKEN_KEY);
export const removeTokenFromLocalStorage = () => localStorage.setItem(ACCESS_TOKEN_KEY, null);
