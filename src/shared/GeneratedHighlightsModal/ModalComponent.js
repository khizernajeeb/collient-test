/*
Call this component when user clicks on view highlights button or clicks on specific highlight on Standard, Most Viewed, Top Rated highlights page

CHILD COMPONENTS:
=======================
- View Reel
- CommentBox
- CarouselClipsComponent
*/

import React, { Component, Fragment } from 'react';
import { Modal, Row, Col } from 'antd';
import CarouselClipsComponent from './CarouselClipsComponent';
import CommentBoxContainer from '../../containers/SharedContainer/CommentBoxContainer';
import ViewReelContainer from '../../containers/SharedContainer/ViewReelContainer';
import Spinner from '../Spinner';

let player;

class ModalComponent extends Component {
  state = {
    visible: true,
  };

  componentDidMount() {
    // if current page is standard, most viewed or top highligts
    if (this.props.publishedReelId) {
      this.props.getClipsInfo('?reelId=' + this.props.reelId);
      this.props.getPublishedReelDetails('?requestId=' + this.props.publishedReelId);
    } else {
      // if current page is a child page of build highlights
      this.props.getChooseCricketClips(this.props.formData);
    }
  }

  componentWillReceiveProps = updatedProps => {
    // call clips info and published reel APIs after receiving choose cricket clips data
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

  // set video player object that defined in view reel component
  setVideoPlayerObject = playerObject => {
    player = playerObject;
    // this.setState({ player });
  };

  // to seek video on given seconds
  seekVideo = seconds => {
    player.seek(seconds);
    player.play();
    // this.state.player.seek(seconds);
    // this.state.player.play();
  };

  // to close modal page
  closeModal = () => {
    this.props.closeModal();
    // player.load();
    // player.pause();
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
        {this.props.chooseCricketClipsLoading || this.props.reelDetailsLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            <Row>
              <Col span={12}>
                <ViewReelContainer
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
          </Fragment>
        )}
      </Modal>
    );
  }
}

export default ModalComponent;
