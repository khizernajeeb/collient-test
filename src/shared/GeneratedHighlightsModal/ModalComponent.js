import React, { Component } from 'react';
import { Modal, Row, Col } from 'antd';
import ViewReelComponent from './ViewReelComponent';
import CarouselClipsComponent from './CarouselClipsComponent';
import CommentBoxContainer from '../../containers/SharedContainer/CommentBoxContainer';

let player;

class ModalComponent extends Component {
  state = {
    visible: true,
  };

  componentDidMount() {
    if (this.props.publishedReelId) {
      this.props.getClipsInfo('?reelId=' + this.props.reelId);
      this.props.getPublishedReelDetails('?requestId=' + this.props.publishedReelId);
    } else {
      this.props.getChooseCricketClips(this.props.formData);
    }
  }

  componentWillReceiveProps = updatedProps => {
    if (this.props.chooseCricketClips !== updatedProps.chooseCricketClips) {
      this.props.getClipsInfo('?reelId=' + updatedProps.chooseCricketClips.reelId);
      this.props.getPublishedReelDetails(
        '?requestId=' + updatedProps.chooseCricketClips.publishedReelRequestId,
      );
      this.setState({
        reelId: updatedProps.chooseCricketClips.reelId,
        reelRequestId: updatedProps.chooseCricketClips.publishedReelRequestId,
      });
    }

    if (this.props.publishedReelId) {
      if (this.props.reelDetails !== updatedProps.reelDetails) {
        this.setState({
          reelId: updatedProps.reelDetails.reelId,
          reelRequestId: updatedProps.reelDetails.publishedReelRequestId,
        });
      }

      if (this.props.clipsInfo !== updatedProps.clipsInfo) {
        this.setState({
          clipsInfo: updatedProps.clipsInfo,
        });
      }
    }
  };

  setVideoPlayerObject = playerObject => {
    player = playerObject;
  };

  seekVideo = seconds => {
    player.seek(seconds);
    player.play();
  };

  closeModal = () => {
    this.props.closeModal();
    player.load();
    player.pause();
  };

  render() {
    console.log('modal compo', this.state, this.props);
    const visible = this.state.visible && this.props.visible;
    return (
      <Modal
        width={1020}
        visible={visible}
        onCancel={this.closeModal}
        title='View your highlights'
        footer={[]}
      >
        <Row>
          <Col span={12}>
            <ViewReelComponent
              setVideoPlayerObject={this.setVideoPlayerObject}
              reelRequestId={this.props.publishedReelId || this.state.reelRequestId}
              reelDetails={this.props.reelDetails}
              reloadHighlightsPage={this.props.reloadHighlightsPage}
            />
          </Col>
          <Col span={11} style={{ float: 'right' }}>
            <div>
              <CommentBoxContainer
                chooseCricketClips={this.props.chooseCricketClips}
                reelRequestId={this.props.publishedReelId || this.state.reelRequestId}
                reelDetailsLoading={this.props.reelDetailsLoading}
                comments={
                  this.props.reelDetails
                    ? this.props.reelDetails.publishedreel.comments[0].comment
                    : null
                }
                visible={this.props.visible}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.props.clipsInfo ? (
              <CarouselClipsComponent
                seekVideo={seconds => this.seekVideo(seconds)}
                clipsInfo={this.props.clipsInfo}
              />
            ) : null}
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default ModalComponent;
