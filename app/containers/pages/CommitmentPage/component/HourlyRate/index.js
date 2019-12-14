import { connect } from 'react-redux';
import { compose } from 'redux';
import { goBack, push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import HourlyRate from './HourlyRate'

import injectReducer from 'utils/injectReducer';
import reducer from '../../reducer';

import {
    hourlyRateNetSelector,
    hourlyRateGrossSelector,
    hourlyRateNet,
    minHourlyRateNet
} from '../../selector';

import {
    addHourlyRateNet,
    addHourlyRateGross,
} from './actions';

const mapStateToProps = createStructuredSelector({
    hourlyRateNet: hourlyRateNetSelector,
    hourlyRateGross: hourlyRateGrossSelector,
    netHR: hourlyRateNet,
    minNet: minHourlyRateNet,
});

const mapDispatchToProps = (dispatch) => ({
    goBack: () => dispatch(goBack()),
    addHourlyRateNet: (hourlyRate) => dispatch(addHourlyRateNet(hourlyRate)),
    addHourlyRateGross: (hourlyRate) => dispatch(addHourlyRateGross(hourlyRate)),
});

const withReducer = injectReducer({ key: 'commitmentPage', reducer})
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReducer, withConnect)(HourlyRate);