import './MeasurementTable.styl';
import React, { Component } from 'react';
//import { Modal } from 'react-bootstrap';

import { withTranslation } from '../../utils/LanguageProvider';

import { Icon } from './../../elements/Icon';
import { MeasurementTableItem } from './MeasurementTableItem.js';
import { OverlayTrigger } from './../overlayTrigger';
import PropTypes from 'prop-types';
import { ScrollableArea } from './../../ScrollableArea/ScrollableArea.js';
import { TableList } from './../tableList';
import { Tooltip } from './../tooltip';
import { withSnackbar } from './../../utils/SnackbarProvider';
import { log } from '@ohif/core';
import OHIF from '@ohif/core';
import { TableListItemEditable } from './../recordData/TableListItemEditable';
import { TableData } from '../tabledata/TableData';
const { MeasurementApi } = OHIF.measurements;

class MeasurementTable extends Component {
  static propTypes = {
    measurementCollection: PropTypes.array.isRequired,
    timepoints: PropTypes.array.isRequired,
    overallWarnings: PropTypes.object.isRequired,
    readOnly: PropTypes.bool,
    onItemClick: PropTypes.func,
    onRelabelClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    onEditDescriptionClick: PropTypes.func,
    selectedMeasurementNumber: PropTypes.number,
    overwallWarnings: PropTypes.object,
    t: PropTypes.func,
    saveFunction: PropTypes.func,
    snackbarContext: PropTypes.object,
  };

  static defaultProps = {
    overallWarnings: {
      warningList: [],
    },
    readOnly: false,
  };

  state = {
    selectedKey: null,
    vertebraTableData: JSON.parse(
      JSON.stringify(MeasurementApi.vertebraTableData)
    ),
    discTableData: JSON.parse(JSON.stringify(MeasurementApi.discTableData)),
  };

  render() {
    const { overallWarnings, saveFunction, t } = this.props;
    const hasOverallWarnings = overallWarnings.warningList.length > 0;

    return (
      <div className="measurementTable">
        <div className="measurementTableHeader">
          {hasOverallWarnings && (
            <OverlayTrigger
              key={'overwall-warning'}
              placement="left"
              overlay={
                <Tooltip
                  placement="left"
                  className="in tooltip-warning"
                  id="tooltip-left"
                  style={{}}
                >
                  <div className="warningTitle">
                    {t('Criteria nonconformities')}
                  </div>
                  <div className="warningContent">
                    {this.getWarningContent()}
                  </div>
                </Tooltip>
              }
            >
              <span className="warning-status">
                <span className="warning-border">
                  <Icon name="exclamation-triangle" />
                </span>
              </span>
            </OverlayTrigger>
          )}
          {this.getTimepointsHeader()}
        </div>
        <ScrollableArea>
          <div>{this.getMeasurementsGroups()}</div>
        </ScrollableArea>
        <div className="measurementTableFooter">
          {saveFunction && (
            <React.Fragment>
              {MeasurementApi.show === 'block'?(<div className="ai_results">
                <a href={MeasurementApi.url_} className="btn-context-flow" style={{"display": MeasurementApi.show}}>Context Flow</a></div>):(MeasurementApi.show_lung === 'block'?(
                <TableListItemEditable
                  onRejectClick={() => MeasurementApi.onRecordDataRejected()}
                  onSaveClick={this.saveFunction}
                  textAreaPrefilledValue={MeasurementApi.getUpdatedRecordData()}
                />):(MeasurementApi.getUpdatedRecordData() !== null ? (
                <TableListItemEditable
                  onRejectClick={() => MeasurementApi.onRecordDataRejected()}
                  onSaveClick={this.saveFunction}
                  textAreaPrefilledValue={MeasurementApi.getUpdatedRecordData()}
                />
              ) : (
                <TableData onSaveClickMT={this.saveFunction} buttonName="View AI Results"/>
              )))}

            </React.Fragment>          )}
          {MeasurementApi.show_lung === 'block'?
            (<div className="ai_results">
            <a href={MeasurementApi.url_} className="btn-context-flow" style={{"display": MeasurementApi.show_lung}}>Lung Analysis</a></div>):''}
        </div>
      </div>
    );
  }
  saveFunction = recordData => async event => {
    const { saveFunction, snackbarContext } = this.props;
    if (saveFunction) {
      try {
        await saveFunction(recordData);
        snackbarContext.show({
          title: 'STOW SR',
          message: 'Measurements were saved with success',
        });
      } catch (error) {
        log.error(`Error during store attempt: ${error}`);
        snackbarContext.show({
          title: 'STOW SR',
          message: 'Error while saving the measurements',
        });
      }
    }
  };

  getMeasurementsGroups = () => {
    return this.props.measurementCollection.map((measureGroup, index) => {
      return (
        <TableList
          key={index}
          customHeader={this.getCustomHeader(measureGroup)}
        >
          {this.getMeasurements(measureGroup)}
        </TableList>
      );
    });
  };

  getMeasurements = measureGroup => {
    const selectedKey = this.props.selectedMeasurementNumber
      ? this.props.selectedMeasurementNumber
      : this.state.selectedKey;
    return measureGroup.measurements.map((measurement, index) => {
      const key = measurement.measurementNumber;
      const itemIndex = measurement.itemNumber || index + 1;
      const itemClass =
        selectedKey === key && !this.props.readOnly ? 'selected' : '';

      return (
        <MeasurementTableItem
          key={key}
          itemIndex={itemIndex}
          itemClass={itemClass}
          measurementData={measurement}
          onItemClick={this.onItemClick}
          onRelabel={this.props.onRelabelClick}
          onDelete={this.props.onDeleteClick}
          onEditDescription={this.props.onEditDescriptionClick}
        />
      );
    });
  };

  onItemClick = (event, measurementData) => {
    if (this.props.readOnly) return;

    this.setState({
      selectedKey: measurementData.measurementNumber,
    });

    if (this.props.onItemClick) {
      this.props.onItemClick(event, measurementData);
    }
  };

  getCustomHeader = measureGroup => {
    return (
      <React.Fragment>
        <div className="tableListHeaderTitle">
          {this.props.t(measureGroup.groupName)}
        </div>
        {measureGroup.maxMeasurements && (
          <div className="maxMeasurements">
            {this.props.t('MAX')} {measureGroup.maxMeasurements}
          </div>
        )}
        <div className="numberOfItems">{measureGroup.measurements.length}</div>
      </React.Fragment>
    );
  };

  getTimepointsHeader = () => {
    return this.props.timepoints.map((timepoint, index) => {
      return (
        <div key={index} className="measurementTableHeaderItem">
          <div className="timepointLabel">{this.props.t(timepoint.key)}</div>
          <div className="timepointDate">{timepoint.date}</div>
        </div>
      );
    });
  };

  getWarningContent = () => {
    const { warningList = '' } = this.props.overwallWarnings;

    if (Array.isArray(warningList)) {
      const listedWarnings = warningList.map((warn, index) => {
        return <li key={index}>{warn}</li>;
      });

      return <ol>{listedWarnings}</ol>;
    } else {
      return <React.Fragment>{warningList}</React.Fragment>;
    }
  };
}

const connectedComponent = withSnackbar(
  withTranslation(['MeasurementTable', 'Common'])(MeasurementTable)
);
export { connectedComponent as MeasurementTable };
export default connectedComponent;
