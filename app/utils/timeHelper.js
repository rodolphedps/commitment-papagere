export const secureFormatTime = (time) => {
  if (!time) {
    return '00:00';
  }

  let isNegative = false;
  if (time.startsWith('-')) {
    isNegative = true;
    time = time.substr(1);
  }

  const [hours, minutes] = time.split(':');

  return `${isNegative ? '-' : ''}${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};

export const toTime = (minutes) => {
  const isNegative = minutes < 0;
  const absValue = Math.abs(minutes);
  const hours = Math.floor(absValue / 60);
  const min = Math.floor(absValue % 60);
  const formattedTime = `${isNegative ? '-' : ''}${hours}:${min}`;
  return secureFormatTime(formattedTime);
};

export const difference = (begin, end) => {
  const [beginHour, beginMinute] = secureFormatTime(begin).split(':');
  const [endHour, endMinute] = secureFormatTime(end).split(':');

  const beginTimeMinutesCount = (parseInt(beginHour, 10) * 60) + parseInt(beginMinute, 10);
  const endTimeMinutesCount = (parseInt(endHour, 10) * 60) + parseInt(endMinute, 10);

  const diff = beginTimeMinutesCount > endTimeMinutesCount ?
    beginTimeMinutesCount - endTimeMinutesCount
    : endTimeMinutesCount - beginTimeMinutesCount;

  return toTime(diff);
};

export const sumTimes = (times) => {
  let minutes = 0;

  times.forEach((time) => {
    const [hour, minute] = time.split(':');

    minutes += parseInt(hour, 10) * 60;
    minutes += parseInt(minute, 10);
  });

  return toTime(minutes);
};

export const formatTime = (
  time,
  options = {
    withSpace: true,
  }) => {
  const [hour, minute] = secureFormatTime(time).split(':');
  const parsedHour = parseInt(hour, 10);
  const parsedMinute = parseInt(minute, 10);

  if (parsedHour && parsedMinute) {
    return `${parsedHour}h${minute}`;
  }

  if (parsedHour) {
    return `${parsedHour}${options.withSpace ? ' h' : 'h'}`;
  }

  if (parsedMinute) {
    return `${parsedMinute}${options.withSpace ? ' min' : 'min'}`;
  }

  return '0 h';
};
