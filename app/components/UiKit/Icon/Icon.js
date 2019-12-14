import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Icon = ({ name, className, ...props }) => (
  <i
    className={classNames(
      'icon',
      `icon-${name}`,
      className,
    )}
    {...props}
  />
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
