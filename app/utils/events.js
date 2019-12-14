import {
  EVENT_KIND_FAMILY_EVENT,
  EVENT_KIND_ABSENCE,
  EVENT_KIND_TRAINING,
  EVENT_KIND_VACATION,
  EVENT_KIND_CHILD_VACATION
} from '../constants/event-kinds';


export const getEventIcon = (eventKind, isChild) => {
  switch (eventKind) {
    case EVENT_KIND_FAMILY_EVENT:
      return '🙅‍';

    case EVENT_KIND_TRAINING:
      return '🎓';

    case EVENT_KIND_VACATION:
    case EVENT_KIND_CHILD_VACATION:
      return '⛱️';

    case EVENT_KIND_ABSENCE:
      return isChild ? '🙅‍' : '🙈';

    default:
      return '';
  }
};
