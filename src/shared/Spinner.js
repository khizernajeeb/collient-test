import React, { Component } from 'react';
import { Row, Spin } from 'antd';

class Spinner extends Component {
  render() {
    return (
      <Row type='flex' style={{ display: 'table', margin: '0px auto 20px' }}>
        <Spin tip='Loading...' />
      </Row>
    );
  }
}

export default Spinner;
