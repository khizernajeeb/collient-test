import React, { Component } from 'react'
import { Typography, Divider, Modal, Row, Col, Button } from 'antd'
import ViewReelComponent from './ViewReelComponent'
import Spinner from '../sharedComponents/Spinner'
import CommentBox from '../sharedComponents/Comments/CommentBox'
import ClipsComponent from './ClipsComponent'

const { Title } = Typography

class SelectionInfo extends Component {
  state = {
    visible: false,
  }

  render() {
    return (
      <div style={{ margin: '0px auto' }}>
        {this.props.selectionInfoLoading ? (
          <Spinner />
        ) : this.props.selectionInfo ? (
          <div>
            <Row type='flex' align='middle'>
              <Col span={20}>
                {' '}
                {this.props.selectionInfo.description === 'Nothing'
                  ? ''
                  : this.props.selectionInfo.description}
              </Col>
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
                  disabled={this.props.selectionInfo.numClips === 0}
                  onClick={this.props.showModal}
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
          width={1020}
          visible={this.props.visible}
          onCancel={this.props.closeModal}
          title='View your highlights'
          footer={[]}
        >
          <Row>
            <Col span={12}>
              <ViewReelComponent />
            </Col>
            <Col span={12}>
              <Title level={4}>Comments</Title>{' '}
              <div>
                <CommentBox />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              {this.props.clipsInfo ? (
                <ClipsComponent clipsInfo={this.props.clipsInfo} />
              ) : null}
            </Col>
          </Row>
        </Modal>
      </div>
    )
  }
}

export default SelectionInfo
