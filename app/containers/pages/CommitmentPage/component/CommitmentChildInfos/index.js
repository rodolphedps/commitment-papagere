import { connect } from 'react-redux';
import { compose } from 'redux';
import { goBack, push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';

import CommitmentChildInfos from './CommitmentChildInfos';

import injectReducer from 'utils/injectReducer';
import reducer from '../../reducer';

import {
    childcareSelector,
} from '../../selector';

import {
    addChildStore,
} from '../../actions';

const mapStateToProps = createStructuredSelector({
    childcare: childcareSelector,
});

const mapDispatchToProps = (dispatch) => ({
    goBack: () => dispatch(goBack()),
    addChildStore: (childcare) => dispatch(addChildStore(childcare)),
});

const withReducer = injectReducer({ key: 'commitmentPage', reducer})
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReducer, withConnect)(CommitmentChildInfos);