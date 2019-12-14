import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import ErrorBoundary from './ErrorBoundary';

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  resetApp: () => dispatch({ type: 'RESET_APP' }),
  reloadApp: () => dispatch(push('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);
