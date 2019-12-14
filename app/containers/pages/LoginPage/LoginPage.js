import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import queryString from 'query-string';

import FloatingLabel from '../../../components/UiKit/FloatingLabel';
import Icon from '../../../components/UiKit/Icon';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { TRANSLATIONS } from '../../../translations';

import papagereAvatar from '../../../images/login/papagere-avatar.png';
import papagereAvatar2x from '../../../images/login/papagere-avatar@2x.png';
import papagereAvatar3x from '../../../images/login/papagere-avatar@3x.png';

import './LoginPage.scss';
import { OkModal, Button } from '../../../components/UiKit';
import { calcRem } from '../../../utils/styleHelper';
import { roboto } from '../../../constants/font-families';
import { COLORS } from '../../../constants/colors';


const translations = TRANSLATIONS.sign_in;

const papaGereIconStyle = {
  color: COLORS.WHITE,
  fontSize: calcRem(40),
};

const loginButtonStyle = {
  background: COLORS.GREEN1,
  minWidth: calcRem(150),
};

const loginButtonIconStyle = {
  fontSize: calcRem(10),
};


class LoginPage extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    error: PropTypes.string,
    emailError: PropTypes.string,
    passwordForgottenSuccessModalOpened: PropTypes.bool.isRequired,
    loginButtonEnabled: PropTypes.bool.isRequired,
    changeEmail: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    onPasswordForgottenClick: PropTypes.func.isRequired,
    closePasswordForgottenSuccessModal: PropTypes.func.isRequired,
    location: PropTypes.object,
  };

  componentDidMount() {
    document.body.classList.add('dark-gray-background');

    const { email } = queryString.parse(this.props.location.search);
    if (email) {
      this.props.changeEmail({ target: { value: email } });
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('dark-gray-background');
  }

  get translations() {
    return translations;
  }

  handleEmailKeyPress = (event) => {
    if (event.key === 'Enter') {
      document.getElementById('password-input').focus();
    }
  }

  handlePasswordKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.props.login();
    }
  }

  renderPapaGereLogo() {
    return (
      <div className="login-page__ppg-logo-container">
        <img
          src={papagereAvatar}
          srcSet={`${papagereAvatar2x} 2x, ${papagereAvatar3x} 3x`}
          alt="PapaGère logo"
        />
        <Icon
          name="papagere"
          style={papaGereIconStyle}
        />
      </div>
    );
  }

  renderLoginForm() {
    const {
      changeEmail,
      changePassword,
      login,
      email,
      password,
      error,
      emailError,
    } = this.props;

    return (
      <div
        className="login-page__login-form"
        onSubmit={login}
      >
        <FloatingLabel
          id="email-input"
          type="email"
          value={email}
          placeholder={this.translations.email}
          error={emailError}
          onChange={changeEmail}
          onKeyPress={this.handleEmailKeyPress}
        />
        <FloatingLabel
          id="password-input"
          type="password"
          value={password}
          placeholder={this.translations.password}
          error={error}
          onChange={changePassword}
          onKeyPress={this.handlePasswordKeyPress}
        />
      </div>
    );
  }

  renderLoginButton() {
    const { loading, login, loginButtonEnabled } = this.props;

    const content = loading ?
      (
        <Button
          style={loginButtonStyle}
          iconStyle={loginButtonIconStyle}
        >
          <LoadingIndicator />
        </Button>
      )
      : (
        <Button
          text={this.translations.login_button}
          icon="check"
          style={loginButtonStyle}
          iconStyle={loginButtonIconStyle}
          onClick={login}
          disabled={!loginButtonEnabled}
        />
      );

    return (
      <div
        className={classNames(
          'login-page__login-btn-container',
          { 'login-page__login-btn-container--loading': loading },
        )}
      >
        {content}
      </div>
    );
  }

  renderForgottenPasswordLink() {
    return (
      <div
        className="login-page__forgotten-password-link"
        onClick={this.props.onPasswordForgottenClick}
      >
        {this.translations.lostPswLink}
      </div>
    );
  }

  renderForgottenPasswordSuccessModal() {
    const {
      email,
      passwordForgottenSuccessModalOpened,
      closePasswordForgottenSuccessModal,
    } = this.props;

    const message = this.translations.forgottenPasswordEmailSended
      .replace('{0}', email);

    return (
      <OkModal
        message={message}
        open={passwordForgottenSuccessModalOpened}
        onOkClick={closePasswordForgottenSuccessModal}
        messageStyle={{
          fontSize: calcRem(15),
          fontWeight: roboto.regular,
        }}
      >

      </OkModal>
    );
  }

  render() {
    return (
      <div className="login-page">
        {this.renderPapaGereLogo()}
        {this.renderLoginForm()}
        {this.renderLoginButton()}
        {this.renderForgottenPasswordLink()}
        {this.renderForgottenPasswordSuccessModal()}
      </div>
    );
  }
}

export default LoginPage;
