import { financial } from 'utils/numbers';
import { format as dateFormat } from 'utils/date';

const baseFormatter = (value, appendIfNotNull = undefined, defaultValue = undefined) => {
  const base = value || defaultValue;

  if (base !== undefined && appendIfNotNull !== undefined) {
    return `${base} ${appendIfNotNull}`;
  }

  return base;
};

export const formatFinancialValue = (value) => baseFormatter(financial(value, true), '€', financial(0, true));

export const formatDays = (dayCount) => baseFormatter(dayCount, 'j', 0);

export const formatPercentage = (value) => baseFormatter(value * 100, '%', 0);

export const formatDate = (date) => (date ? dateFormat(date, 'dd/MM/yyyy') : '...');

