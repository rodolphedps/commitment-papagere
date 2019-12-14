import React, { Fragment } from 'react';

import LoadingIndicator from 'components/LoadingIndicator';
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

const buttonStyle = {
  width: buttonWidth,
  height: buttonWidth,
};

const yesButtonStyle = {
  ...buttonStyle,
  background: COLORS.GREEN1,
};

const noButtonStyle = {
  ...buttonStyle,
  backgroundColor: COLORS.GREEN1,
  background: COLORS.RED2,
};

const YesNoModal = ({
  onYesClick,
  onNoClick,
  loading,
  ...props
}) => (
  <Modal {...props}>
    <div style={buttonsContainerStyle}>
      {loading ?
        (<LoadingIndicator />)
        : (
          <Fragment>
            <Button
              icon="cross"
              style={noButtonStyle}
              onClick={onNoClick}
            />
            <Button
              icon="check"
              style={yesButtonStyle}
              onClick={onYesClick}
            />
          </Fragment>
        )}
    </div>
  </Modal>
);

export default YesNoModal;
