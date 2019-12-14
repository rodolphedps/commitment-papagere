import React from 'react';
import PropTypes from 'prop-types';

import './PlaceholderTab.scss';

import { Header } from '../UiKit';
import { TRANSLATIONS } from '../../translations';

const { upcoming } = TRANSLATIONS.shared;

const PlaceholderTab = ({
  tabTitle,
  title,
  messages,
  children,
}) => (
  <React.Fragment>
    <Header title={tabTitle} />
    <div className="placeholder-tab">
      <h1>{title || upcoming}</h1>
      {messages.map((m) => <p key={m}>{m}</p>)}
      {children}
    </div>
  </React.Fragment>
);

PlaceholderTab.propTypes = {
  tabTitle: PropTypes.string.isRequired,
  title: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.element,
};

export default PlaceholderTab;
