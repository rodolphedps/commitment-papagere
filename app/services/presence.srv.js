/* eslint-disable class-methods-use-this */
class PresenceSrv {
  hasUncontractualizedAttendance(presence) {
    const contractualizedHours = presence.getIn(['contract', 'hours']);
    const selectedHours = presence.getIn(['presence', 'hours']);

    return contractualizedHours.size < selectedHours.size;
  }
}

const instance = new PresenceSrv();

export { instance as PresenceSrv };
