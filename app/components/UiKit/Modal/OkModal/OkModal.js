import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Button from '../../Button';
import { COLORS } from '../../../../constants/colors';
import { calcRem } from '../../../../utils/styleHelper';


const buttonWidth = calcRem(64);

const buttonsContainerStyle = {
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  marginTop: calcRem(60),
};


const okButtonStyle = {
  width: buttonWidth,
  height: buttonWidth,
  background: COLORS.GREEN1,
};


const OkModal = ({
  onOkClick,
  ...props,
}) => (
  <Modal {...props}>
    <div style={buttonsContainerStyle}>
      <Button
        icon="check"
        style={okButtonStyle}
        onClick={onOkClick}
      />
    </div>
  </Modal>
);

OkModal.propTypes = {
  onOkClick: PropTypes.func,
};

OkModal.defaultProps = {
  onOkClick: () => { },
};

export default OkModal;
