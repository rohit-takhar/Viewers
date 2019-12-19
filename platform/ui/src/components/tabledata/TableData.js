import './TableData.styl';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ModalView';
import { ModalView } from './ModalView';
import OHIF from '@ohif/core';

const { MeasurementApi } = OHIF.measurements;

export class TableData extends Component {
  static propTypes = {
    onSaveClickMT: PropTypes.func,
    buttonName: PropTypes.string,
  };

  state = { isModalEnabled: false };

  changeModalState = bool => {
    this.setState({ isModalEnabled: bool });
  };

  onRejectClick = bool => {
    console.log('onRejectClicked for table');
    this.setState({ isModalEnabled: bool });
    this.props.onSaveClickMT('reject items: ');
  };

  onSaveClick = dataOnSave => {
    console.log('onSaveClicked for table');
    this.setState({ isModalEnabled: false });
    this.props.onSaveClickMT('success items: ' + MeasurementApi.discTableData);
  };

  render() {
    return (
      <React.Fragment>
        <div className="ai_results">
          <button
            className="btn-results"
            onClick={() => this.changeModalState(true)}
          >
            {this.props.buttonName}
          </button>
        </div>
        {this.state.isModalEnabled ? (
          <ModalView
            onRejectClick={() => this.onRejectClick(false)}
            onSaveClick={this.onSaveClick}
            onCloseClick={() => this.changeModalState(false)}
          ></ModalView>
        ) : null}
      </React.Fragment>
    );
  }
}
