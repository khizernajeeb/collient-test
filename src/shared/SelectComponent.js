import React, { Component } from 'react';
import { Select } from 'antd';

class SelectComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <Select
          defaultValue={this.props.options[this.props.defaultIndex]}
          style={{ marginLeft: '10px' }}
          onChange={this.props.changeSelectOption}
        >
          {this.props.options.map(element => {
            return (
              <Select.Option key={element} value={element}>
                {element}
              </Select.Option>
            );
          })}
        </Select>
      </React.Fragment>
    );
  }
}

export default SelectComponent;
