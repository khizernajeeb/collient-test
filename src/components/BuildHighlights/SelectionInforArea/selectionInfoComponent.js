import React, { Component } from 'react';
import { Badge, Row, Col, Button } from 'antd';
import ModalContainer from '../../../containers/SharedContainer/ModalContainer';

class SelectionInfo extends Component {
  state = {
    visible: false,
  };

  // to show modal page
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  // to close modal page
  closeModal = () => {
    this.setState({ visible: false });
  };

  render() {
    console.log('selectionInfo', this.state, this.props, this.props.formData);
    return (
      <div style={{ margin: '0px auto' }}>
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
                View Highlights
              </Button>
            </Col>
          </Row>
        </div>
        {this.state.visible && (
          <ModalContainer
            closeModal={this.closeModal}
            formData={this.props.formData}
            visible={this.state.visible}
          />
        )}
      </div>
    );
  }
}
export default SelectionInfo;
