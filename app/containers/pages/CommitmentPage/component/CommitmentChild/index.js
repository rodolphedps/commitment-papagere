import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { goBack, push } from 'react-router-redux';
import injectReducer from 'utils/injectReducer';

//import injectSaga from 'utils/injectSaga';
//import saga from './saga';

import CommitmentChild from './CommitmentChild'
import reducer from '../../reducer';

import {
    childcareSelector,
} from '../../selector';

import {
    addData,
    deleteChild,
    addWeekOccurrences,
    updateOccurrences,
} from './actions';

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    return {
        child: state.commitmentPage.get('childcare').find(child => child.get('id') === id)
    }
}

const mapDispatchtoProps = (dispatch) => ({
    goBack: () => dispatch(goBack()),
    addData: (data, id) => dispatch(addData(data, id)),
    openScheduleEditor: (id, index) => dispatch(push(`/commitment/infos_child/${id}/schedule/${index}/edit_schedule`)),
    openSchedulePage: (id, index) => dispatch(push(`/commitment/infos_child/${id}/${index}/schedule`)),
    addWeekOccurrences: (data, id, key) => dispatch(addWeekOccurrences(data, id, key)),
    updateOccurrences: (data, id) => dispatch(updateOccurrences(data, id)),
    deleteChild: (id) => dispatch(deleteChild(id)),
});

const withReducer = injectReducer({ key: 'commitmentPage', reducer})
const withConnect = connect(mapStateToProps, mapDispatchtoProps)

export default compose(withReducer, withConnect)(CommitmentChild);