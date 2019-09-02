import React, { Component } from 'react'
import { Dropdown, Button, Icon } from 'antd'

class DropdownComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <Dropdown overlay={this.props.type}>
          <Button>
            {this.props.name} <Icon type='down' />
          </Button>
        </Dropdown>
      </React.Fragment>
    )
  }
}

export default DropdownComponent
