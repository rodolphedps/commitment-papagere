import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { calcRem } from '../../../../utils/styleHelper';
import Icon from '../../Icon';

import './ContextualButtonItem.scss';


const ContextualMenuItem = ({
  label,
  imgSrc,
  imgSrcSet,
  imgStyle,
  disabled,
  onClick,
}) => (
  <div
    className={classNames(
      'contextual-button-item',
      {
        'contextual-button-item--disabled': disabled,
      }
    )}
    onClick={onClick}
  >
    <div className="contextual-button-item__image-container">
      <img
        className="contextual-button-item__image-container__image"
        src={imgSrc}
        srcSet={imgSrcSet}
        alt="menu icon"
        style={imgStyle}
      />
    </div>
    <div className="contextual-button-item__label">
      {label}
    </div>
    <Icon
      name="dropdown-arrow-right"
      style={{ fontSize: calcRem(6) }}
    />
  </div>
);

ContextualMenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  imgSrcSet: PropTypes.string,
  imgStyle: PropTypes.object,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

ContextualMenuItem.defaultProps = {
  imgSrcSet: undefined,
  imgStyle: undefined,
  disabled: false,
  onClick: () => { },
};

export default ContextualMenuItem;
