import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../Icon';

import './style.scss';

export default class Card extends React.PureComponent {
  static defaultProps = {
    subtitle: '',
    oneRow: false,
    iconStyle: {
      color: '#50E3C2',
    },
  };

  render() {
    return (
      <div className={classNames('card', { 'one-row': this.props.oneRow })}>
        <div className="card-header" style={this.props.headerStyle}>
          <Icon name="info" style={this.props.iconStyle} />
          <span className="card-title" style={this.props.titleStyle}>{this.props.title}</span>
          <span className="card-subtitle" style={this.props.subtitleStyle}>{this.props.subtitle}</span>
        </div>
        <div className="card-body" style={this.props.bodyStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  iconStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  subtitleStyle: PropTypes.object,
  headerStyle: PropTypes.object,
  bodyStyle: PropTypes.object,
  oneRow: PropTypes.bool,
  children: PropTypes.node,
};
