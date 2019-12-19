import './toolbar-button.styl';

import { Icon } from './../elements/Icon';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { withTranslation } from '../utils/LanguageProvider';

export function ToolbarButton(props) {
  const { isActive, icon, labelWhenActive, onClick, t } = props;
  const className = classnames(props.className, { active: isActive });
  const iconProps = typeof icon === 'string' ? { name: icon } : icon;
  const label = isActive && labelWhenActive ? labelWhenActive : props.label;
  const icon_mapping = {
    "Scroll": "http://192.168.25.5/img/stack_scroll_icon.png",
    "Zoom": "http://192.168.25.5/img/zoom.png",
    "Window": "http://192.168.25.5/img/window.png",
    "Levels": "http://192.168.25.5/img/window.png",
    "Pan": "http://192.168.25.5/img/pan.png",
    "Length": "http://192.168.25.5/img/length.png",
    "Annotate": "http://192.168.25.5/img/annotate.png",
    "Angle": "http://192.168.25.5/img/angle.png",
    "Reset": "http://192.168.25.5/img/reset.png",
    "CINE": "http://192.168.25.5/img/cine.png",
    "Layout": "http://192.168.25.5/img/layout.png",
    "2D MPR": "http://192.168.25.5/img/2dmpr.png",
    "More": "http://192.168.25.5/img/more.png",
    "Freehand": "http://192.168.25.5/img/dentist-tools.png",
    "Download": "http://192.168.25.5/img/download.png",
    "Eraser": "http://192.168.25.5/img/eraser.png",
    "Circle": "http://192.168.25.5/img/shape_12.png",
    "Rectangle": "http://192.168.25.5/img/shape_13.png",
    "Invert": "http://192.168.25.5/img/invert.png",
    "Clear": "http://192.168.25.5/img/delete.png",
    "Magnify": "http://192.168.25.5/img/magnifying-glass.png",
    "Flip H": "http://192.168.25.5/img/icon_copy.png",
    "Flip V": "http://192.168.25.5/img/icon.png",
    "Rotate": "http://192.168.25.5/img/rotate.png",
    "Bidirectional": "http://192.168.25.5/img/transfer.png",
    "Ellipse": "http://192.168.25.5/img/shape_12.png",

  }
  const arrowIconName = props.isExpanded ? 'caret-up' : 'caret-down';
  const arrowIcon = props.isExpandable && (
    <Icon name={arrowIconName} className="expand-caret" />
  );

  const handleClick = event => {
    if (onClick) {
      onClick(event, props);
    }
  };

  return (
    <div className={className} onClick={handleClick}>
      <div className="toolbar-button-label">
        <span><img src={icon_mapping[label]} alt=""/></span><br/>
        {t(label)}
          {arrowIcon}
      </div>
    </div>
  );
}

ToolbarButton.propTypes = {
  id: PropTypes.string,
  isActive: PropTypes.bool,
  /** Display label for button */
  label: PropTypes.string.isRequired,
  /** Alternative text to show when button is active */
  labelWhenActive: PropTypes.string,
  className: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ]),
  onClick: PropTypes.func,
  /** Determines if we show expandable 'caret' symbol */
  isExpandable: PropTypes.bool,
  /** Direction of expandable 'caret' symbol */
  isExpanded: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

ToolbarButton.defaultProps = {
  isActive: false,
  className: 'toolbar-button',
};

export default withTranslation('Buttons')(ToolbarButton);
