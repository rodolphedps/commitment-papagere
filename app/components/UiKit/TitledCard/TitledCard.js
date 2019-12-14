import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TitledCard.scss';
import { ListCard } from '../List';


const TitledCard = ({ title, className, children }) => (
  <ListCard className={classNames('titled-card', className)}>
    <div className="titled-card__header">
      {title}
    </div>
    <div className="titled-card__container">
      {children}
    </div>
  </ListCard>
);

TitledCard.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

TitledCard.defaultProps = {};

export default TitledCard;
