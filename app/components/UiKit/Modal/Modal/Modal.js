import React, { Children } from 'react';
import PropTypes from 'prop-types';
import MuiModal from '@material-ui/core/Modal';

import './Modal.scss';


const Modal = ({
  message,
  messageStyle,
  open,
  onClick,
  children,
}) => (
  <MuiModal
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    open={open}
    BackdropProps={{
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
      }
    }}
    onClick={onClick}
  >
    <div className="uikit-modal">
      <div
        className="uikit-modal__message"
        style={messageStyle}
      >
        {Children.toArray(message).map((msg) => (
          <div key={msg}>{msg}</div>
        ))}
      </div>
      {children}
    </div>
  </MuiModal>
);


Modal.propTypes = {
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  messageStyle: PropTypes.object,
  open: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default Modal;
