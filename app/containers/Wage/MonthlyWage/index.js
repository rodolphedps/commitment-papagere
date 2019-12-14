import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectConnectedPeople } from '../../App/selectors';
import MonthlyWage from './MonthlyWage';

const mapStateToProps = createStructuredSelector({
  connectedPeople: makeSelectConnectedPeople(),
});

export default connect(mapStateToProps)(MonthlyWage);
