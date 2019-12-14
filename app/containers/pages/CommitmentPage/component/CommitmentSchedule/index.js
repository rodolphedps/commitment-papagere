import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { goBack, push } from 'react-router-redux';
import injectReducer from 'utils/injectReducer';

//import injectSaga from 'utils/injectSaga';
//import saga from './saga';

import CommitmentSchedule from './CommitmentSchedule'

import {
    childcareSelector,
} from '../../selector';

import {
    addSchedule,
} from './actions';

import {
    addData,
} from '../CommitmentChild/actions';

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    let index = ownProps.match.params.index - 1;
    const child = state.commitmentPage.get('childcare').find(child => child.get('id') === id);
    var occur = 0;
    child.getIn(['schedule', index, 'weekOccurency']) !== null ? occur = child.getIn(['schedule', index, 'weekOccurency']) : occur = 0;
    return {
        occur,
        child,
    }
}

const mapDispatchtoProps = (dispatch) => ({
    goBack: () => dispatch(goBack()),
    openScheduleEditor: (id, index) => dispatch(push(`/commitment/infos_child/${id}/schedule/${index}/edit_schedule`)),
    addSchedule: (data, id) => dispatch(addSchedule(data, id)),
    addData: (data, id) => dispatch(addData(data, id)),
});

const withConnect = connect(mapStateToProps, mapDispatchtoProps)

export default compose(withConnect)(CommitmentSchedule);