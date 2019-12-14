import { createSelector } from 'reselect';


export const loginPageSelector = (state) => state.loginPage;

export const emailSelector = createSelector(
  loginPageSelector,
  (loginPage) => loginPage.get('email')
);

export const passwordSelector = createSelector(
  loginPageSelector,
  (loginPage) => loginPage.get('password')
);

export const loadingSelector = createSelector(
  loginPageSelector,
  (loginPage) => loginPage.get('loading')
);

export const errorSelector = createSelector(
  loginPageSelector,
  (loginPage) => loginPage.get('error')
);

export const emailErrorSelector = createSelector(
  loginPageSelector,
  (loginPage) => loginPage.get('emailError'),
);

export const passwordForgottenSuccessModalOpenedSelector = createSelector(
  loginPageSelector,
  (loginPage) => loginPage.get('passwordForgottenSuccessModalOpened'),
);

export const loginButtonEnabledSelector = createSelector(
  emailSelector,
  passwordSelector,
  (email, password) => !!(email && email.length && password && password.length >= 6)
);
