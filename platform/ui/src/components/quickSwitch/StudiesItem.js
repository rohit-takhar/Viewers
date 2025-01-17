import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './StudiesItem.styl';

export class StudiesItem extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    studyData: PropTypes.object.isRequired,
    active: PropTypes.bool,
  };

  render() {
    const {
      studyDate,
      studyDescription,
      modalities,
      studyAvailable,
    } = this.props.studyData;
    const activeClass = this.props.active ? ' active' : '';
    const hasDescriptionAndDate = studyDate && studyDescription;
    return (
      <div
        className={`studyBrowseItem${activeClass}`}
        onClick={this.props.onClick}
      >
        <div className="studyItemBox">
          <div className="studyModality">
            <div
              className="studyModalityText"
              style={this.getModalitiesStyle()}
            >
              {modalities}
            </div>
          </div>
          <div className="studyText">
            {hasDescriptionAndDate ? (
              <React.Fragment>
                <div className="studyDate">{studyDate}</div>
                <div className="studyDescription">{studyDescription}</div>
              </React.Fragment>
            ) : (
              <div className="studyAvailability">
                {studyAvailable ? (
                  <React.Fragment>N/A</React.Fragment>
                ) : (
                  <React.Fragment>Click to load</React.Fragment>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  getModalitiesStyle = () => {
    return {};
  };
}
