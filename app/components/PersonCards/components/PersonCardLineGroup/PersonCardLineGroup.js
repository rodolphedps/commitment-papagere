import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class PersonCardLine extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children } = this.props;

    return (
      <div className="person-info-group">
        {children}
      </div>
    );
  }
}

export default PersonCardLine;
