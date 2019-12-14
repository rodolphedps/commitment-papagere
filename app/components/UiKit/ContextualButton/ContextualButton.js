import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { calcRem } from '../../../utils/styleHelper';

import './ContextualButton.scss';
import RoundedButton from '../RoundedButton';

class ContextualButton extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
      closing: false,
    };
  }

  handleButtonClick = () => {
    const { open } = this.state;

    if (open) {
      this.setState({ open: false, closing: true });
    } else {
      this.setState({ open: true, closing: false });
    }
  };

  renderTile() {
    const { title } = this.props;

    if (!title) {
      return null;
    }

    return (
      <div className="contextual-menus__container__title">
        {title}
      </div>
    );
  }

  render() {
    const { open, closing } = this.state;

    return (
      <React.Fragment>
        <div className={classNames('contextual-menus', { open })}>
          <div className="contextual-menus__container">
            {this.renderTile()}
            {this.props.children}
          </div>
        </div>
        <div className="contextual-button">
          <div className={classNames({ 'rotate-open': open, 'rotate-close': closing })}>
            <RoundedButton
              iconName="plus"
              style={{ width: calcRem(48), height: calcRem(48) }}
              onClick={this.handleButtonClick}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ContextualButton;
