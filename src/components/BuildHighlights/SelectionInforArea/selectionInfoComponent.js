import React, { Component } from 'react';
import { Badge, Row, Col, Button } from 'antd';
import ModalContainer from '../../../containers/SharedContainer/ModalContainer';

class SelectionInfo extends Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  closeModal = () => {
    this.setState({ visible: false });
  };

  render() {
    console.log('selectionInfo', this.state, this.props, this.props.formData);
    return (
      <div style={{ margin: '0px auto' }}>
        {true ? (
          <div>
            <Row type='flex' align='middle'>
              <Col span={20}>{this.props.selectionInfo.description}</Col>
              <Col span={4}>
                <Button
                  disabled={this.props.selectionInfo.numClips < 1}
                  type='primary'
                  size={'large'}
                  onClick={this.showModal}
                  style={{ height: '50px' }}
                >
                  <Badge
                    className='highlightsBadge'
                    count={this.props.selectionInfo.numClips}
                    overflowCount={999}
                  />
                  View Highlightss
                </Button>
              </Col>
            </Row>
          </div>
        ) : null}
        {this.state.visible ? (
          <ModalContainer
            closeModal={this.closeModal}
            formData={this.props.formData}
            visible={this.state.visible}
          />
        ) : null}
      </div>
    );
  }
}
export default SelectionInfo;
