import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { goBack, push } from 'react-router-redux';
import injectReducer from 'utils/injectReducer';

//import injectSaga from 'utils/injectSaga';
//import saga from './saga';

import CommitmentScheduleEditor from './CommitmentScheduleEditor'

import {
    updateSchedule,
    updateDuration,
} from './actions';

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    let index = ownProps.match.params.index - 1;
    const child = state.commitmentPage.get('childcare').find(child => child.get('id') === id)
    var days = child.getIn(['schedule', index, 'days']);
    var occur = 0;
    child.getIn(['schedule', index, 'weekOccurency']) !== 0 ? occur = child.getIn(['schedule', index, 'weekOccurency']) : occur = 0;
    return {
        child,
        days,
        occur
    }
};

const mapDispatchtoProps = (dispatch) => ({
    goBack: () => dispatch(goBack()),
    updateSchedule: (data, id, key) => dispatch(updateSchedule(data, id, key)),
    updateDuration: (data, id, key) => dispatch(updateDuration(data, id, key)),
});

const withConnect = connect(mapStateToProps, mapDispatchtoProps)

export default compose(withConnect)(CommitmentScheduleEditor);