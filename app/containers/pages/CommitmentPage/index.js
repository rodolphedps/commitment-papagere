import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import reducer from './reducer';
import { createCommitmentRoutine, loadGrossHourlyRate } from './routines';
import CommitmentPage from './CommitmentPage';

import saga from './saga';

import {
  commitmentSelector,
  loadingSelector,
  errorSelector,
  childcareSelector,
  hourlyRateNetSelector,
  hourlyRateGrossSelector,
  dateSelector,
  hourlyRateGross
} from './selector';

import  {
  addChildStore,
  setHourlyRate,
  deleteChild,
  addStartDate
} from './actions';

const mapStateToProps = createStructuredSelector({
  childcare: childcareSelector,
  hourlyRateNet: hourlyRateNetSelector,
  hourlyRateGross: hourlyRateGrossSelector,
  startAt: dateSelector,
  grossHR: hourlyRateGross,
  loading: loadingSelector,
});

const mapDispatchToProps = (dispatch) => ({
  getGrossHourlyRate: () => dispatch(loadGrossHourlyRate()),
  openHourlyRatePage: () => dispatch(push(`/commitment/hourly_rate`)),
  openNewChildPage: () => dispatch(push(`/commitment/add_child`)),
  addChildStore: (childcare) => dispatch(addChildStore(childcare)),
  openChildInfos: (id) => dispatch(push(`/commitment/infos_child/${id}`)),
  openCommitmentCreation: () => dispatch(push(`/commitment/generate_commitment`)),
  addStartDate: (data) => dispatch(addStartDate(data)),
  deleteChild: (id) => dispatch(deleteChild(id)),
});

const withReducer = injectReducer({ key: 'commitmentPage', reducer });
const withSaga = injectSaga({key: 'commitmentPage', saga})
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReducer, withSaga, withConnect)(CommitmentPage);