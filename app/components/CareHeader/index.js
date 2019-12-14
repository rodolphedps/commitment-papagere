import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLoading } from '../../containers/App/selectors';
import CareHeader from './CareHeader';


const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
});

const mapDispatchToProps = () => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(CareHeader);
