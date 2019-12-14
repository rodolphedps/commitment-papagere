import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import saga from './saga';
import reducer from './reducer';

import {
  changeEmail,
  changePassword,
  loginRequest,
  passwordForgotten,
  closePasswordForgottenSuccessModal,
} from '../LoginPage/actions';
import { emailSelector, passwordSelector, loadingSelector, errorSelector, emailErrorSelector, passwordForgottenSuccessModalOpenedSelector, loginButtonEnabledSelector } from './selectors';
import LoginPage from './LoginPage';

const mapDispatchToProps = (dispatch) => ({
  changeEmail: (event) => dispatch(changeEmail(event.target.value)),
  changePassword: (event) => dispatch(changePassword(event.target.value)),
  login: () => dispatch(loginRequest()),
  onPasswordForgottenClick: () => dispatch(passwordForgotten()),
  closePasswordForgottenSuccessModal: () => dispatch(closePasswordForgottenSuccessModal()),
});

const mapStateToProps = createStructuredSelector({
  email: emailSelector,
  password: passwordSelector,
  loading: loadingSelector,
  error: errorSelector,
  emailError: emailErrorSelector,
  passwordForgottenSuccessModalOpened: passwordForgottenSuccessModalOpenedSelector,
  loginButtonEnabled: loginButtonEnabledSelector,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(withReducer, withSaga, withConnect)(LoginPage);
export { mapDispatchToProps };

