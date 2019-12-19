import './TableListItemEditable.styl';
import React, { Component } from 'react';

import PropTypes from 'prop-types';

export class TableListItemEditable extends Component {
  static propTypes = {
    children: PropTypes.node,
    itemClass: PropTypes.string,
    itemIndex: PropTypes.number,
    itemKey: PropTypes.oneOfType(['number', 'string']),
    onSaveClick: PropTypes.func,
    onRejectClick: PropTypes.func,
    textAreaPrefilledValue: PropTypes.string,
  };

  state = {
    textareaVal: this.props.textAreaPrefilledValue,
  };

  render() {
    return (
      <div className="editable">
        <div className="blue-div">
          <textarea onChange={this.updateTextArea} value={this.state.textareaVal}></textarea>
          <button onClick={() => this.props.onRejectClick()} className="btn-reject">Reject</button>
          <button onClick={this.props.onSaveClick(this.state.textareaVal)} className="btn-accept">
            Accept
          </button>
        </div>
      </div>
    );
  }

  updateTextArea = event => {
    this.setState({
      textareaVal: event.target.value,
    });
  };
}
