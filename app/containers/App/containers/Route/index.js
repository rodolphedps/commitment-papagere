import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectCurrentUser } from '../../selectors';

import Route from './Route';

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

export default connect(mapStateToProps)(Route);
