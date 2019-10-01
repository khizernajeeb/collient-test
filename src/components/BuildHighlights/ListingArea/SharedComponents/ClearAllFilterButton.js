import React, { Component } from 'react';
import { Button, Divider } from 'antd';

class ClearAllFilterButton extends Component {
  render() {
    return (
      <>
        <Button style={{ margin: '0 0 10px' }} onClick={this.props.clearAllFilters}>
          Clear All
        </Button>
        <Divider style={{ marginTop: '10px' }} />
      </>
    );
  }
}

export default ClearAllFilterButton;
