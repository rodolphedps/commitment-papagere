import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { goBack, push } from 'react-router-redux';
import injectReducer from 'utils/injectReducer';

import injectSaga from 'utils/injectSaga';
import saga from '../CommitmentCreation/saga';
import { createCommitmentRoutine } from '../../routines';

import CommitmentSummary from './CommitmentSummary';

const mapStateToProps = (state, ownProps) => {
    return {
        children: state.commitmentPage.get('childcare'),
        parent: state.commitmentPage.get('parent'),
        nanny: state.commitmentPage.get('nanny'),
        morningH: state.commitmentPage.get('morningHourLimit'),
        eveningH: state.commitmentPage.get('eveningHourLimit'),
        maintenanceFee: state.commitmentPage.get('maintenanceFee'),
        startAt: state.commitmentPage.get('startAt'),
    }
};

const mapDispatchToProps = (dispatch) => ({
    goBack: () => dispatch(goBack()),
    createCommitment: () => dispatch(createCommitmentRoutine()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({key: 'commitmentPage', saga});

export default compose(withSaga, withConnect)(CommitmentSummary);