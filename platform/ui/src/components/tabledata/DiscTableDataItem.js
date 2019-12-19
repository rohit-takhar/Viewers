import './TableData.styl';
import React, { Component } from 'react';
import './TableData';
import PropTypes from 'prop-types';
import OHIF from '@ohif/core';
const { MeasurementApi } = OHIF.measurements;
export class DiscTableDataItem extends Component {
  static propTypes = {
    label: PropTypes.string,
    scdiameter: PropTypes.string,
    discheight: PropTypes.string,
    listhesis: PropTypes.string,
    comments: PropTypes.string,
    position: PropTypes.number,
    dataset: PropTypes.object,
  };

  state = {
    label: this.props.label,
    scdiameter: this.props.scdiameter,
    discheight: this.props.discheight,
    listhesis: this.props.listhesis,
    comments: this.props.comments,
    discTableData: JSON.parse(JSON.stringify(MeasurementApi.discTableData)),
  };

  updateDiscTableJson = (keyName, value) => {
    var updatedTemp = this.state.discTableData;
    updatedTemp[this.props.position][keyName] = value;
    this.props.dataSetForParent(keyName, value, this.props.position);
    return null;
  };
  updateDiameter(evt) {
    this.setState({
      scdiameter: evt.target.value,
    });
    this.updateDiscTableJson('sc_diameter', evt.target.value);
  }
  updateHeight(evt) {
    this.setState({
      discheight: evt.target.value,
    });
    this.updateDiscTableJson('disc_height', evt.target.value);
  }
  updateThesis(evt) {
    this.setState({
      listhesis: evt.target.value,
    });
    this.updateDiscTableJson('listhesis', evt.target.value);
  }
  updateComment(evt) {
    this.setState({
      comments: evt.target.value,
    });
    this.updateDiscTableJson('comments', evt.target.value);
  }

  render() {
    return (
      <React.Fragment>
        <tr>
          <td>
            <input
              type="text"
              contentEditable={false}
              value={this.state.label}
              readOnly
            ></input>
          </td>
          <td>
            <input
              type="text"
              value={this.state.scdiameter}
              placeholder=".42mm(Normal)"
              onChange={evt => this.updateDiameter(evt)}
            ></input>
          </td>
          <td>
            <input
              type="text"
              value={this.state.discheight}
              onChange={evt => this.updateHeight(evt)}
            ></input>
          </td>
          <td>
            <input
              type="text"
              value={this.state.listhesis}
              onChange={evt => this.updateThesis(evt)}
            ></input>
          </td>
          <td>
            <input
              type="text"
              value={this.state.comments}
              onChange={evt => this.updateComment(evt)}
            ></input>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}
