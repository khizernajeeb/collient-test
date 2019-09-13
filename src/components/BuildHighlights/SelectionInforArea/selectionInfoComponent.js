import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import { BATSMAN, BOWLER } from '../../../configs/constants';
import { baseFormData } from '../../../redux/sources/requestBody';

import { Divider, Modal, Row, Col, Button } from 'antd';
import ViewReelComponent from './GeneratedHighlightsModal/ViewReelComponent';
import Spinner from '../../SharedComponents/Spinner';
import CommentBox from '../../SharedComponents/Comments/CommentBox';
import ClipsComponent from './GeneratedHighlightsModal/ClipsComponent';

let player;
class SelectionInfo extends Component {
  state = {
    visible: false,
  };

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

    if (this.props.clipsInfo !== updatedProps.clipsInfo) {
      this.setState({
        clipsInfo: updatedProps.clipsInfo,
      });
    }

    // if (this.props.selectionInfo !== updatedProps.selectionInfo) {
    //   this.setState({
    //     selectionInfo: updatedProps.selectionInfo,
    //   })
    // }
  };

  showModal = () => {
    let formData = new FormData();
    for (let key in baseFormData) {
      formData.append(key, baseFormData[key]);
    }

    this.props.selectedRows.forEach(row => {
      if (row.playerType === BATSMAN.toLowerCase()) {
        formData.append('selectedBatsmanTeamIds', row.teamId);
        formData.append('selectedBatsmanIds', row.playerId);
      } else if (row.playerType === BOWLER.toLowerCase()) {
        formData.append('selectedBowlerTeamIds', row.teamId);
        formData.append('selectedBowlerIds', row.playerId);
      } else if (row.outcomeKey) {
        formData.append(row.outcomeKey, row.outcomeValue);
      } else if (row.matchId) {
        formData.append('selectedMatchIds', row.matchId);
      }
    });
    this.props.getChooseCricketClips(formData);
    this.setState({
      visible: true,
    });
  };

  closeModal = () => {
    this.setState({ visible: false });
    player.load();
    player.pause();
  };

  setVideoPlayerObject = playerObject => {
    player = playerObject;
  };

  seekVideo = seconds => {
    player.seek(seconds);
    player.play();
  };

  render() {
    console.log('selectionInfo', this.state, this.props);
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
          width={1020}
          visible={this.state.visible}
          onCancel={this.closeModal}
          title='View your highlights'
          footer={[]}
        >
          <Row>
            <Col span={12}>
              <ViewReelComponent
                setVideoPlayerObject={this.setVideoPlayerObject}
                reelRequestId={this.state.reelRequestId}
                reelDetails={this.props.reelDetails}
              />
              {/* <ReelDescription reelDetails={this.props.reelDetails}/> */}
            </Col>
            <Col span={11} style={{ float: 'right' }}>
              <div>
                <CommentBox
                  chooseCricketClips={this.props.chooseCricketClips}
                  reelRequestId={this.props.reelRequestId}
                  reelDetailsLoading={this.props.reelDetailsLoading}
                  comments={
                    this.props.reelDetails
                      ? this.props.reelDetails.publishedreel.comments[0].comment
                      : null
                  }
                  visible={this.state.visible}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              {this.props.clipsInfo ? (
                <ClipsComponent
                  seekVideo={seconds => this.seekVideo(seconds)}
                  clipsInfo={this.props.clipsInfo}
                />
              ) : null}
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

//export default SelectionInfo

const mapStateToProps = state => {
  return {
    //selectionInfo: state.players.selectionInfo,
    selectionInfoLoading: state.players.selectionInfoLoading,
    searchableTeamsInfoLoading: state.players.searchableTeamsInfoLoading,
    searchablePlayersInfoLoading: state.players.searchablePlayersInfoLoading,
    teamsInfo: state.players.teamsInfo,
    playersInfo: state.players.playersInfo,
    chooseCricketClips: state.players.chooseCricketClips,
    chooseCricketClipsLoading: state.players.chooseCricketClipsLoading,
    clipsInfo: state.players.clipsInfo,
    reelDetails: state.players.reelDetails,
    addClipComment: state.players.addClipComment,
    reelDetailsLoading: state.players.reelDetailsLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  //getSelectionInfo: (formData) => dispatch(actions.getSelectionInfo(formData)),
  getSearchableTeamsInfo: formData => dispatch(actions.getSearchableTeamsInfo(formData)),
  getSearchablePlayersInfo: formData => dispatch(actions.getSearchablePlayersInfo(formData)),
  getChooseCricketClips: formData => dispatch(actions.getChooseCricketClips(formData)),
  getClipsInfo: formData => dispatch(actions.getClipsInfo(formData)),
  getPublishedReelDetails: formData => dispatch(actions.getPublishedReelDetails(formData)),
  addClipComment: formData => dispatch(actions.addClipComment(formData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectionInfo);
