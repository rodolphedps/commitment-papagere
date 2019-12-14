import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './LabelledInput.scss';


const LabelledInput = ({
  label,
  labelStyle,
  labelClassname,
  children
}) => (
  <div className="labelled-input">
    <div
      className={classNames('labelled-input__label', labelClassname)}
      style={labelStyle}
    >
      {label}
    </div>
    {children}
  </div>
);

LabelledInput.propTypes = {
  label: PropTypes.string.isRequired,
  labelStyle: PropTypes.object,
  labelClassname: PropTypes.string,
  children: PropTypes.node.isRequired,
};


export default LabelledInput;
