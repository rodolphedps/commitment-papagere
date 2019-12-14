import {
  addYears as fnsAddYears,
  addMonths as fnsAddMonths,
  addDays as fnsAddDays,
  addHours as fnsAddHours,

  parse as fnsParse,
  format as fnsFormat,
  toDate as fnsToDate,
  getYear as fnsGetYear,
  getMonth as fnsGetMonth,
  getMinutes as fnsGetMinutes,
  isSameDay as fnsIsSameDay,
  isSameMinute as fnsIsSameMinute,
  isAfter as fnsIsAfter,
  isBefore as fnsIsBefore,
  startOfWeek as fnsStartOfWeek,
  startOfDay as fnsStartOfDay,
  startOfHour as fnsStartOfHour,
  endOfMonth as fnsEndOfMonth,
  endOfWeek as fnsEndOfWeek,
  differenceInDays as fnsDifferenceInDays,
  isValid as fnsIsValid,
  getWeek as fnsGetWeek,
} from 'date-fns/esm';
import { fr } from 'date-fns/esm/locale';


const options = {
  locale: fr,
  awareOfUnicodeTokens: true,
};

export const format =
(date, formatStr) => fnsFormat(date, formatStr, options);

export const formatDateWithDay = (date) => format(date, 'E dd MMM yyyy');

export const formatDateDefault = (date) => format(date, 'dd MMM yyyy');

export const parse =
  (dateStr, formatStr, baseDate = new Date()) => fnsParse(dateStr, formatStr, baseDate, options);

export const toDate =
  (value) => fnsToDate(value, options);

export const isSameDay =
  (dateLeft, dateRight) => fnsIsSameDay(dateLeft, dateRight, options);

export const isSameMinute =
  (dateLeft, dateRight) => fnsIsSameMinute(dateLeft, dateRight, options);

export const getMinutes =
  (date) => fnsGetMinutes(date, options);

export const getMonth =
  (date) => fnsGetMonth(date, options);

export const getYear =
  (date) => fnsGetYear(date, options);

export const isAfter =
  (date, dateToCompare) => fnsIsAfter(date, dateToCompare, options);

export const isBefore =
  (date, dateToCompare) => fnsIsBefore(date, dateToCompare, options);

export const startOfWeek =
  (date) => fnsStartOfWeek(date, options);

export const startOfDay =
  (date) => fnsStartOfDay(date, options);

export const startOfHour =
  (date) => fnsStartOfHour(date, options);

export const endOfMonth =
  (date) => fnsEndOfMonth(date, options);

export const endOfWeek =
  (date) => fnsEndOfWeek(date, options);

export const differenceInDays =
  (dateLeft, dateRight) => fnsDifferenceInDays(dateLeft, dateRight, options);

export const addDays =
  (date, amount) => fnsAddDays(date, amount, options);

export const addMonths =
  (date, amount) => fnsAddMonths(date, amount, options);

export const addYears =
  (date, amount) => fnsAddYears(date, amount, options);

export const isValid =
  (date) => fnsIsValid(date, options);

export const addHours =
  (date, amount) => fnsAddHours(date, amount, options);

export const getWeek =
  (date) => fnsGetWeek(date, options);

export const compareAsc = (dateA, dateB) => {
  if (dateA > dateB) {
    return 1;
  } else if (dateA < dateB) {
    return -1;
  }
  return 0;
};

export const compareDesc = (dateA, dateB) => compareAsc(dateA, dateB) * -1;

export const setTimeFromStr = (timeStr, date) => {
  const [hours, minutes] = timeStr.split(':');
  date.setHours(Number.parseInt(hours, 10));
  date.setMinutes(Number.parseInt(minutes, 10));
};

export const toDateStr = (date) => {
  const monthStr = `${(date.getMonth() + 1)}`.padStart(2, '0');
  const dayStr = `${date.getDate()}`.padStart(2, '0');
  return `${date.getFullYear()}-${monthStr}-${dayStr}`;
};

export const toTimeStr = (date) => {
  const hours = `${date.getHours()}`.padStart(2, '0');
  const minutes = `${date.getMinutes()}`.padStart(2, '0');
  return `${hours}:${minutes}`;
};
