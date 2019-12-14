import * as Sentry from '@sentry/browser';
import { toast } from 'react-toastify';
import { TRANSLATIONS } from 'translations';

export const sentryActivated = (process.env.SENTRY_ACTIVE === 'true');
export const toastDuration = 7000;

/**
 * Logs an error to Sentry
 */
export const logToSentry = (error, errorInfo) => {
  if (!sentryActivated) {
    return;
  }

  Sentry.withScope((scope) => {
    if (errorInfo) {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });
    }
    Sentry.captureException(error);
  });
};

export const invalidateSession = () => {
  localStorage.clear();
  sessionStorage.clear();
  // eslint-disable-next-line no-restricted-globals
  location.assign('/');
};

export const handleUnauthorizedRequest = () => {
  toast.warn(TRANSLATIONS.shared.expiredSessionWarningMessage);
  setTimeout(() => {
    invalidateSession();
  }, toastDuration);
};

export const handleUnexpectedException = (error, errorInfo) => {
  console.error(error, errorInfo);
  toast.error(TRANSLATIONS.shared.defaultServerErrorMessage);
  logToSentry(error, errorInfo);
  // setTimeout(() => {
  //   invalidateSession();
  // }, toastDuration);
};
