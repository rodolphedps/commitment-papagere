import * as PhoneNumber from 'awesome-phonenumber';

export const isPhoneValid = (phoneString) => {
  if (!phoneString) {
    return false;
  }

  const formatted = new PhoneNumber(phoneString, 'FR');
  return formatted.isValid();
};

export const isMobile = (phoneString) => {
  if (!phoneString) {
    return false;
  }

  const formatted = new PhoneNumber(phoneString, 'FR');
  return formatted.isValid() && formatted.isMobile();
};

export const formatPhone = (phoneString) => {
  if (!isPhoneValid(phoneString)) {
    return undefined;
  }

  const formatted = new PhoneNumber(phoneString, 'FR');
  return formatted.getNumber('international');
};
