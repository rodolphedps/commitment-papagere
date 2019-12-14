import React from 'react';
import classNames from 'classnames';

import NavigationItem from '../NavigationItem';

import './NavigationBar.scss';
import { TRANSLATIONS } from '../../../translations';

export const NavigationBarItems = [
  {
    path: '/planning',
    label: TRANSLATIONS.navigation_bar.planning,
    icon: 'planning',
  },
  {
    path: '/holidays',
    label: TRANSLATIONS.navigation_bar.holidays,
    icon: 'holiday',
  },
  {
    path: '/wages',
    label: TRANSLATIONS.navigation_bar.wage,
    icon: 'wage',
  },
  {
    path: '/contracts',
    label: TRANSLATIONS.navigation_bar.contracts,
    icon: 'contracts',
  },
  {
    path: '/account',
    label: TRANSLATIONS.navigation_bar.account,
    icon: 'person',
  },
];

const NavigationBar = () => {
  const navigationItems = NavigationBarItems.map((item) =>
    <NavigationItem key={item.path} {...item} />
  );

  return (
    <div className={classNames('navigation-bar', { dark: process.env.ENV === 'staging' })}>
      {navigationItems}
    </div>
  );
};

export default NavigationBar;
