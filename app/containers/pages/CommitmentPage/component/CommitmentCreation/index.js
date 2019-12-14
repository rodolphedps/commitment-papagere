import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { goBack, push } from 'react-router-redux';
import injectReducer from 'utils/injectReducer';

import injectSaga from 'utils/injectSaga';
import saga from './saga';

import CommitmentCreation from './CommitmentCreation'

import {
    childcareSelector,
    parentSelector,
    nannySelector,
} from '../../selector';

import {
    addParentInfos,
    addNannyInfos,
    addMorningHourLimit,
    addEveningHourLimit,
    addMaintenanceFee,
    addStartDate,
} from './actions';

import {
    createCommitmentRoutine,
} from '../../routines';

const mapStateToProps = createStructuredSelector({
    childcare: childcareSelector,
    parent: parentSelector,
    nanny: nannySelector,
});

const mapDispatchtoProps = (dispatch) => ({
    goBack: () => dispatch(goBack()),
    addParentInfos: (data) => dispatch(addParentInfos(data)),
    addNannyInfos: (data) => dispatch(addNannyInfos(data)),
    addMorningHourLimit: (data) => dispatch(addMorningHourLimit(data)),
    addEveningHourLimit: (data) => dispatch(addEveningHourLimit(data)),
    addMaintenanceFee: (data) => dispatch(addMaintenanceFee(data)),
    addStartDate: (data) => dispatch(addStartDate(data)),
    createCommitment: () => dispatch(createCommitmentRoutine.trigger()),
    openSummary: () => dispatch(push(`/commitment/generate_commitment/summary`)),
});

const withSaga = injectSaga({ key: 'commitmentPage', saga});
const withConnect = connect(mapStateToProps, mapDispatchtoProps)

export default compose(withSaga, withConnect)(CommitmentCreation);