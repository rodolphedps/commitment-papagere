import React from 'react';
import Popup from 'reactjs-popup';

import shareIcon from '../../../../images/icons/ios/share.png';
import addToHomeScreenIcon from '../../../../images/icons/ios/add-to-home-screen.png';
import { calcRem } from '../../../../utils/styleHelper';
import { TRANSLATIONS } from '../../../../translations';


import './InstallModal.scss';


const {
  text1,
  text2,
} = TRANSLATIONS.installModal;

const InstallModal = () => (
  <Popup
    modal
    defaultOpen
    position="bottom center"
    contentStyle={{
      width: '100%',
      position: 'absolute',
      left: 0,
      bottom: calcRem(25),
    }}
    overlayStyle={{
      zIndex: 1001,
    }}
    offset={1000}
  >
    <div className="install-modal">
      <div>
        <img
          src={addToHomeScreenIcon}
          alt="iOSAddToHomeScreenIcon"
          className="install-modal__icon-add"
        />
      </div>
      <div>
        {text1}
        <img
          src={shareIcon}
          alt="iOSShareIcon"
          className="install-modal__icon-share"
        />
        {text2}
      </div>
    </div>
  </Popup>
);

export default InstallModal;
