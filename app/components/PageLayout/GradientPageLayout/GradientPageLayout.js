import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { AppServices } from '../../../containers/App/services';

import './GradientPageLayout.scss';


class GradientPageLayout extends PureComponent {
  static propTypes = {
    content: PropTypes.node,
    header: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    footer: PropTypes.node,
    contentClassname: PropTypes.string,
    gradientClass: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.isIos = AppServices.isIos();
  }

  componentDidMount() {
    if (this.isIos) {
      noBounce.init({ // eslint-disable-line no-undef
        animate: false,
      });
    }

    const { gradientClass } = this.props;
    if (gradientClass) {
      document.body.classList.add(gradientClass);
    }
  }

  componentWillReceiveProps({ gradientClass: nextGradientClass }) {
    const { gradientClass } = this.props;

    if (gradientClass) {
      document.body.classList.remove(gradientClass);
    }

    if (nextGradientClass) {
      document.body.classList.add(nextGradientClass);
    }
  }

  componentWillUnmount() {
    if (this.isIos) {
      noBounce.disable(); // eslint-disable-line no-undef
    }

    const { gradientClass } = this.props;
    if (gradientClass) {
      document.body.classList.remove(gradientClass);
    }
  }

  render() {
    const {
      header,
      content,
      footer,
      contentClassname
    } = this.props;

    return (
      <div className="gradient-page-layout">
        <div
          className="gradient-page-layout__header-container"
        >
          {header || null}
        </div>
        <div
          className={classNames('gradient-page-layout__content-container', contentClassname)}
        >
          {content || null}
        </div>
        {!!footer &&
          <div className="gradient-page-layout__footer-container">
            {footer}
          </div>
        }
      </div>
    );
  }
}

export default GradientPageLayout;
