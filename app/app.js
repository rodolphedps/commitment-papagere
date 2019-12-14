/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';
import 'whatwg-fetch';

// Import all the third party stuff
import React from 'react';
import { render as RdRender, unmountComponentAtNode as RdUnmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import FontFaceObserver from 'fontfaceobserver';
import createHistory from 'history/createBrowserHistory';
import { PersistGate } from 'redux-persist/integration/react';

import 'sanitize.css/sanitize.css';

// Sentry
import * as Sentry from '@sentry/browser';
import { sentryActivated } from 'utils/exceptionHelper';

// Import root app
import App from 'containers/App';

// Load the favicon
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
/* eslint-enable import/no-webpack-loader-syntax */

// Import CSS reset and Global Styles
import 'styles/theme.scss';

import configureStore from './configureStore';

// Sentry activation
if (sentryActivated) {
  Sentry.init({
    dsn: process.env.SENTRY_DNS,
  });
}

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
}, () => {
  document.body.classList.remove('fontLoaded');
});

// Create redux store with history
const history = createHistory();

const { store } = configureStore({}, history);

const MOUNT_NODE = document.getElementById('app');

const render = () => {
  RdRender(
    <Provider store={store}>
      <PersistGate persistor={store.persistor}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </PersistGate>
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['containers/App'], () => {
    RdUnmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();
