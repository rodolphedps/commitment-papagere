import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import saga from './saga';
import reducer from './reducer';
import {
  startRefreshConnectedPeople,
  stopRefreshConnectedPeople,
} from './actions';

import GlobalStoreRefresher from './GlobalStoreRefresher';

const mapDispatchToProps = (dispatch) => ({
  startRefreshConnectedPeople: () => dispatch(startRefreshConnectedPeople()),
  stopRefreshConnectedPeople: () => dispatch(stopRefreshConnectedPeople()),
});

const mapStateToProps = () => ({ });

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'globalStoreRefresher', reducer });
const withSaga = injectSaga({ key: 'globalStoreRefresher', saga });

export default compose(withReducer, withSaga, withConnect)(GlobalStoreRefresher);
export { mapDispatchToProps };

