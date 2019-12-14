import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { logToSentry } from 'utils/exceptionHelper';
import { GradientPageLayout } from 'components/PageLayout';
import { TRANSLATIONS } from 'translations';
import { calcRem } from 'utils/styleHelper';
import { Button } from 'components/UiKit';

import './ErrorBoundary.scss';

const reloadButtonStyle = {
  width: calcRem(130),
  height: calcRem(30),
  fontSize: 11,
};

/**
 * Handles unexpected exceptions in App rendering
 */
export default class ErrorBoundary extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    reloadApp: PropTypes.func.isRequired,
    resetApp: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.handleReloadApp = this.handleReloadApp.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logToSentry(error, errorInfo);
  }

  get errorMessage() {
    return TRANSLATIONS.shared.defaultServerErrorMessage;
  }

  get buttonText() {
    return TRANSLATIONS.shared.defaultServerErrorReloadButton;
  }

  handleReloadApp() {
    const { reloadApp, resetApp } = this.props;

    this.setState({ hasError: false });

    if (resetApp) {
      resetApp(); // will trigger the global action to completely clean the redux store
    }

    if (reloadApp) {
      reloadApp(); // will trigger a reload of the app
    }
  }

  renderErrorContent() {
    return (
      <div className="global-error">
        <div className="global-error__message">
          {this.errorMessage}
        </div>
        <div className="global-error__button">
          <Button
            text={this.buttonText}
            style={reloadButtonStyle}
            onClick={this.handleReloadApp}
          />
        </div>
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <GradientPageLayout
          content={this.renderErrorContent()}
          gradientClass="user-theme-bg-0"
        />
      );
    }

    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    );
  }
}
