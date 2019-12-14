import React from 'react';
import PropTypes from 'prop-types';

import './UpdateSnackbar.scss';

const UpdateSnackbar = ({
  onRefreshClick,
}) => (
  <div className="update-snackbar">
    <div>
      Une nouvelle version de PapaGère est disponible
    </div>
    <div className="update-snackbar__actions-bar">
      <div
        className="update-snackbar__actions-bar__update-btn"
        onClick={onRefreshClick}
      >
          Actualiser
      </div>
    </div>
  </div>
);

UpdateSnackbar.propTypes = {
  onRefreshClick: PropTypes.func,
};

UpdateSnackbar.defaultProps = {
  onRefreshClick: () => { },
};

export default UpdateSnackbar;
