import './TableData.styl';
import React, { Component } from 'react';
import { Tabs, Tab } from 'react-tab-view';
import Table from 'react-bootstrap/Table';
import './TableData';
import PropTypes from 'prop-types';
import { DiscTableDataItem } from './DiscTableDataItem';
import { VertebraTableDataItem } from './VertebraTableDataItem';
import OHIF from '@ohif/core';
const { MeasurementApi } = OHIF.measurements;

export class ModalView extends Component {
  state = {
    isModalEnabled: true,
    discTableListState: MeasurementApi.discTableData,
    VertebraTableListState: MeasurementApi.vertebraTableData,
  };
  changeModalState = bool => {
    this.setState({
      isModalEnabled: bool,
      updatedDiscTableData: null,
      udateDiscTableListArray: [],
    });
  };

  callbackFunction = (keyName, value, position) => {
    var swapVar = this.state.discTableListState;
    swapVar[position][keyName] = value;
    this.setState({ discTableListState: swapVar });
  };
  callbackFunction2 = (keyName, value, position) => {
    var swapVar = this.state.VertebraTableListState;
    swapVar[position][keyName] = value;
    this.setState({ discTableListState: swapVar });
  };

  static propTypes = {
    onSaveClick: PropTypes.func,
    onRejectClick: PropTypes.func,
    onCloseClick: PropTypes.func,
  };

  render() {
    const headers = ['DISC QUANTIFICATION', 'VERTEBRA COMPRESSION FRACTURES'];

    return (
      <React.Fragment>
        {this.state.isModalEnabled ? (
          <div className="popup">
            <Tabs headers={headers}>
              <Tab className="tab-tittle">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Disc Level</th>
                      <th>SC Diameter(mm)</th>
                      <th>Disc Height (mm)</th>
                      <th>Listhesis</th>
                      <th>Comments</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.discTableListState.map((value, index) => {
                      // console.log('Data List ' + JSON.stringify(value));
                      return (
                        <DiscTableDataItem
                          key={index}
                          position={index}
                          label={value.disc_level}
                          scdiameter={value.sc_diameter}
                          discheight={value.disc_height}
                          listhesis={value.listhesis}
                          comments={value.comments}
                          dataSetForParent={this.callbackFunction}
                        />
                      );
                    })}
                  </tbody>
                </Table>
                <div>
                  <img className="table-image" src={MeasurementApi.imageURL} />
                </div>
                <div>
                  <button
                    className="btn-close"
                    onClick={() => this.props.onCloseClick()}
                  >
                    Close
                  </button>
                  <button
                    className="btn-edit"
                    onClick={() =>
                      this.props.onSaveClick(this.state.updatedDiscTableData)
                    }
                  >
                    Accept
                  </button>
                  <button
                    className="btn-save"
                    onClick={() => this.props.onRejectClick()}
                  >
                    Reject
                  </button>
                </div>
              </Tab>
              <Tab>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Level</th>
                      <th>Anterior Height(mm)</th>
                      <th>Middle Height(mm)</th>
                      <th>Posterior Height(mm)</th>
                      <th>Status</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.VertebraTableListState.map((value, index) => {
                      // console.log('Data List ' + JSON.stringify(value));
                      return (
                        <VertebraTableDataItem
                          key={index}
                          position={index}
                          level={value.level}
                          anterior_height={value.anterior_height}
                          middle_height={value.middle_height}
                          posterior_height={value.posterior_height}
                          status={value.status}
                          dataSetForParent={this.callbackFunction2}
                        />
                      );
                    })}
                  </tbody>
                </Table>
                <div>
                  <img className="table-image" src={MeasurementApi.imageURL} />
                </div>
                <div>
                  <button
                    className="btn-close"
                    onClick={() => this.props.onCloseClick()}
                  >
                    Close
                  </button>
                  <button
                    className="btn-edit"
                    onClick={() => this.props.onSaveClick()}
                  >
                    Accept
                  </button>
                  <button
                    className="btn-save"
                    onClick={() => this.props.onRejectClick()}
                  >
                    Reject
                  </button>
                </div>
              </Tab>
            </Tabs>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}
