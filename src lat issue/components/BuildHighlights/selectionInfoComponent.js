import React, { Component } from 'react'
import { Divider, Modal, Row, Col, Spin, Button } from 'antd'
import ViewReelComponent from './ViewReelComponent'

class SelectionInfo extends Component {
  state = {
    visible: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    })
  }

  render() {
    const { visible } = this.state

    return (
      <div style={{ margin: '0px auto' }}>
        {this.props.selectionInfoLoading ? (
          <Row type='flex' style={{ display: 'table', margin: '0px auto' }}>
            <Spin />
          </Row>
        ) : this.props.selectionInfo ? (
          <div>
            <Row type='flex' align='middle'>
              <Col span={20}> {this.props.selectionInfo.description}</Col>
              <Col span={4}>
                <span
                  style={{
                    display: 'block',
                    border: '1px solid #999',
                    borderRadius: '5px',
                    borderBottom: 'none',
                    borderBottomRightRadius: 0,
                    padding: '3px',
                    fontSize: '20px',
                    textAlign: 'center',
                    borderBottomLeftRadius: 0,
                  }}
                >
                  {this.props.selectionInfo.numClips}
                </span>
                <Button
                  onClick={this.showModal}
                  style={{ width: '100%', borderRadius: '0' }}
                  type='primary'
                >
                  View Highlights
                </Button>
              </Col>
            </Row>
            <Divider />
          </div>
        ) : null}

        <Modal
          visible={visible}
          onCancel={this.handleCancel}
          title='Title'
          footer={[]}
        >
          <ViewReelComponent />
        </Modal>
      </div>
    )
  }
}

export default SelectionInfo
