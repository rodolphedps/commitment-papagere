import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch } from 'react-router-dom';
import { FeatureToggles } from '@paralleldrive/react-feature-toggles';
import { StripeProvider } from 'react-stripe-elements';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { registerPwaOpeningHandler } from 'service-worker/service-worker-utils';

import { toastDuration, logToSentry } from 'utils/exceptionHelper';
import GlobalStoreRefresher from './containers/GlobalStoreRefresher';
import { InstallModal, UpdateSnackbar } from './components';
import { AppServices } from './services';
import routes from './routes';
import AuthLayout from './components/AuthLayout';

import './style.scss';
import NetworkGuard from './containers/NetworkGuard/NetworkGuard';
import ErrorBoundary from './containers/ErrorBoundary';

const features = process.env.FEATURES ? process.env.FEATURES.split(',') : [];

/* eslint-disable class-methods-use-this */
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showInstallMessage: this.appServices.shouldDisplayInstallMessage,
      showUpdateSnackbar: false,
      crispInitialized: false,
    };
  }

  componentDidMount() {
    /**
     * Handles update of the service worker : determines if the update snackbar should be displayed or if the update should be silent
     */
    const registerSWLifeCycleHandler = (reg) => {
      if (reg.waiting) {
        // a new version is already waiting to take control
        this.newWorker = reg.waiting;
        this.setState({ showUpdateSnackbar: true });
      }

      // Handle updates occuring while the app is running (either actively or in the background)
      reg.onupdatefound = () => {
        this.newWorker = reg.installing;

        this.newWorker.onstatechange = () => {
          if (this.newWorker.state === 'installed') {
            if (reg.active) { // a version of the SW is already up and running
              this.setState({ showUpdateSnackbar: true });
            } else {
              localStorage.setItem('ppg-installed', true);
            }
          }
        };
      };

      return reg;
    };

    // register the SW
    if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'development') {

      // Register an event listener to handle messages sent by the SW
      navigator.serviceWorker.addEventListener('message', ({ data }) => {
        if (data.message === 'force-reload') {
          window.location.reload(false);
        }
      });

      navigator.serviceWorker.register('/ppg-sw.js')
        .then(registerSWLifeCycleHandler)
        .then(registerPwaOpeningHandler)
        .catch((err) => logToSentry(new Error('Could not register Service Worker'), err));
    }
  }

  get appServices() {
    return AppServices;
  }

  requireUpdate() {
    if (this.newWorker) {
      this.newWorker.postMessage({ action: 'skipWaiting' });
      setImmediate(() => this.setState({ showUpdateSnackbar: false }));
    }
  }

  buildInstallPopup() {
    return this.state.showInstallMessage ? <InstallModal /> : null;
  }

  buildUpdatePopop() {
    if (!this.state.showUpdateSnackbar) {
      return null;
    }

    return (
      <UpdateSnackbar
        onRefreshClick={() => this.requireUpdate()}
        onCloseClick={() => this.setState({ showUpdateSnackbar: false })}
      />
    );
  }

  initCrisp() {
    if (this.state.crispInitialized) {
      return;
    }

    window.$crisp = [];
    window.CRISP_WEBSITE_ID = 'b9451d0f-c080-44a2-861e-af25ae9687f8';
    (() => {
      const d = document;
      const s = d.createElement('script');
      s.src = 'https://client.crisp.chat/l.js'; s.async = 1; d.getElementsByTagName('head')[0].appendChild(s);
    })();

    this.setState({ crispInitialized: true });
  }

  renderCrispScript() {
    return (
      <script type="text/javascript">
        {this.initCrisp()}
      </script>
    );
  }

  render() {
    return (
      <NetworkGuard>
        <ErrorBoundary>
          <StripeProvider apiKey={process.env.STRIPE_API_KEY}>
            <FeatureToggles features={features}>
              <Helmet>
                {this.renderCrispScript()}
              </Helmet>
              {this.buildInstallPopup()}
              {this.buildUpdatePopop()}
              <GlobalStoreRefresher>
                <Switch >
                  {
                    routes
                      .map(({
                        route: Route,
                        path,
                        component,
                        layout = AuthLayout,
                        layoutProps = undefined,
                        exact = true,
                        allowConnected = false // used in Route component to make an unauthenticated route accessible to connected users
                      }) => (
                        <Route
                          key={path}
                          layout={layout}
                          path={path}
                          component={component}
                          layoutProps={layoutProps}
                          exact={exact}
                          allowConnected={allowConnected}
                        />
                      ))}
                </Switch>
              </GlobalStoreRefresher>
              <ToastContainer
                autoClose={toastDuration}
                hideProgressBar
                closeButton={false}
              />
            </FeatureToggles>
          </StripeProvider>
        </ErrorBoundary>
      </NetworkGuard>
    );
  }
}

export default App;
