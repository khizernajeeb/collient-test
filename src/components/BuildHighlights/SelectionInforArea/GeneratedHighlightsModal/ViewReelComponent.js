import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../../redux/actions';
import { Row, Col, Icon } from 'antd';
import { Player } from 'video-react';
import sampleVideo from '../../../../assets/sampleVideo.mp4';
import ShareComponent from './ShareComponent';
import 'video-react/dist/video-react.css';

let thumbUp;
let thumbDown;

class ViewReelComponent extends Component {
  componentDidMount() {
    console.log('did mount', this.props.getRating);
  }

  componentWillReceiveProps = updatedProps => {
    if (this.props.getRating !== updatedProps.getRating) {
      thumbDown = updatedProps.getRating.publishedreel.rating[0].noOfthumbdown;
      thumbUp = updatedProps.getRating.publishedreel.rating[0].noOfthumbup;
    } else {
      thumbDown = thumbUp = null;
    }
    console.log('will receive', thumbDown, thumbUp);
  };
  setRating = thumbType => {
    let formData = new FormData();
    formData.append('thumb', thumbType);
    formData.append('requestId', this.props.reelRequestId);
    formData.append('rating', thumbType === 'n' ? 1 : 5);
    this.props.addRating(formData);
  };

  setThumbsUpDown = getRating => {
    thumbDown = getRating ? getRating.publishedreel.rating[0].noOfthumbdown : null;
    thumbUp = getRating ? getRating.publishedreel.rating[0].noOfthumbup : null;
  };

  render() {
    this.props.setVideoPlayerObject(this.player);
    //this.setThumbsUpDown(this.props.getRating);
    // const thumbDown = this.props.getRating
    //   ? this.props.getRating.publishedreel.rating[0].noOfthumbdown
    //   : null;
    // const thumbUp = this.props.getRating
    //   ? this.props.getRating.publishedreel.rating[0].noOfthumbup
    //   : null;

    console.log('viewReel', this.state, this.props, this.player);
    return (
      <div>
        <Player
          autoPlay={true}
          startTime={2}
          width={'100%'}
          ref={player => {
            this.player = player;
          }}
        >
          <source src={sampleVideo} />
        </Player>
        {this.props.reelDetails ? (
          <Row style={{ margin: '20px 0' }}>
            <Col span={16}>{this.props.reelDetails.publishedreel.queryDescription}</Col>
            <Col span={8}>
              <ShareComponent />

              <div
                style={{
                  border: '1px solid #999',
                  width: '102px',
                  padding: '0 10px',
                  borderRadius: '5px',
                  float: 'right',
                  clear: 'right',
                }}
              >
                <span style={{ display: 'inline-block', float: 'left' }}>
                  {thumbDown || this.props.reelDetails.publishedreel.rating[0].noOfthumbdown}
                  <Icon
                    style={{ padding: '0 0 0 5px' }}
                    type='dislike'
                    theme='filled'
                    onClick={() => this.setRating('n')}
                  />
                </span>
                <span style={{ display: 'inline-block', float: 'right' }}>
                  {thumbUp || this.props.reelDetails.publishedreel.rating[0].noOfthumbup}
                  <Icon
                    style={{ padding: '0 0 0 5px' }}
                    type='like'
                    theme='filled'
                    onClick={() => this.setRating('y')}
                  />
                </span>
              </div>
            </Col>
          </Row>
        ) : null}
        <Row>
          <Col />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    getRating: state.players.getRating,
  };
};

const mapDispatchToProps = dispatch => ({
  addRating: formData => dispatch(actions.addRating(formData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewReelComponent);
