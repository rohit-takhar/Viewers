import './TableData.styl';
import React, { Component } from 'react';
import './TableData';
import PropTypes from 'prop-types';
import OHIF from '@ohif/core';
const { MeasurementApi } = OHIF.measurements;

export class VertebraTableDataItem extends Component {
  static propTypes = {
    level: PropTypes.string,
    anterior_height: PropTypes.string,
    middle_height: PropTypes.string,
    posterior_height: PropTypes.string,
    status: PropTypes.string,
    position: PropTypes.number,
    dataset: PropTypes.object,
  };

  state = {
    level: this.props.level,
    anterior_height: this.props.anterior_height,
    middle_height: this.props.middle_height,
    posterior_height: this.props.posterior_height,
    status: this.props.status,
    vertebraTableDataItem: JSON.parse(
      JSON.stringify(MeasurementApi.vertebraTableData)
    ),
  };

  render() {
    return (
      <React.Fragment>
        <tr>
          <td>
            <input
              type="text"
              contentEditable={false}
              value={this.state.level}
              readOnly
            ></input>
          </td>
          <td>
            <input
              type="text"
              value={this.state.anterior_height}
              onChange={evt => this.updateAH(evt)}
            ></input>
          </td>
          <td>
            <input
              type="text"
              value={this.state.middle_height}
              onChange={evt => this.updateMH(evt)}
            ></input>
          </td>
          <td>
            <input
              type="text"
              value={this.state.posterior_height}
              onChange={evt => this.updatePH(evt)}
            ></input>
          </td>
          <td>
            <input
              type="text"
              value={this.state.status}
              onChange={evt => this.updateStatus(evt)}
            ></input>
          </td>
        </tr>
      </React.Fragment>
    );
  }

  updateVertebraTableJson = (keyName, value) => {
    var updatedTemp = this.state.vertebraTableDataItem;
    updatedTemp[this.props.position][keyName] = value;
    this.props.dataSetForParent(keyName, value, this.props.position);
    return null;
  };
  updateAH(evt) {
    this.setState({
      anterior_height: evt.target.value,
    });
    this.updateVertebraTableJson('anterior_height', evt.target.value);
  }
  updateMH(evt) {
    this.setState({
      middle_height: evt.target.value,
    });
    this.updateVertebraTableJson('middle_height', evt.target.value);
  }
  updatePH(evt) {
    this.setState({
      posterior_height: evt.target.value,
    });
    this.updateVertebraTableJson('posterior_height', evt.target.value);
  }
  updateStatus(evt) {
    this.setState({
      status: evt.target.value,
    });
    this.updateVertebraTableJson('status', evt.target.value);
  }
}
