import React, { Component } from 'react';
import { Input } from 'antd';

class SearchField extends Component {
  render() {
    return (
      <React.Fragment>
        <Input placeholder={this.props.placeholder} />
      </React.Fragment>
    );
  }
}

export default SearchField;
