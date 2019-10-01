import React, { Component } from 'react';

import { Row, Col, Icon } from 'antd';
import { Player } from 'video-react';
import sampleVideo from '../../assets/sampleVideo.mp4';
import ShareVideoComponent from './ShareVideoComponent';
import 'video-react/dist/video-react.css';

let thumbUp;
let thumbDown;

class ViewReelComponent extends Component {
  componentWillReceiveProps = updatedProps => {
    if (this.props.getRating !== updatedProps.getRating) {
      thumbDown = updatedProps.getRating.publishedreel.rating[0].noOfthumbdown;
      thumbUp = updatedProps.getRating.publishedreel.rating[0].noOfthumbup;
    } else {
      thumbDown = thumbUp = null;
    }
  };

  // set video reel rating
  setRating = thumbType => {
    let formData = new FormData();
    formData.append('thumb', thumbType);
    formData.append('requestId', this.props.reelRequestId);
    formData.append('rating', thumbType === 'n' ? 1 : 5);
    this.props.addRating(formData);
    if (this.props.reloadHighlightsPage) {
      this.props.reloadHighlightsPage();
    }
  };

  // setThumbsUpDown = getRating => {
  //   thumbDown = getRating ? getRating.publishedreel.rating[0].noOfthumbdown : null;
  //   thumbUp = getRating ? getRating.publishedreel.rating[0].noOfthumbup : null;
  // };

  render() {
    console.log('Playerss', this.player);
    if (this.player) {
      // this.props.setVideoPlayerObject(this.player);
    }
    console.log('viewReel', this.state, this.props, this.player);
    return (
      <div>
        <Player
          autoPlay={true}
          startTime={2}
          width={'100%'}
          ref={player => {
            this.player = player;
            this.props.setVideoPlayerObject(this.player);
            console.log('sdfsdfjsdf', this.player);
          }}
        >
          <source src={sampleVideo} />
        </Player>
        {this.props.reelDetails ? (
          <Row style={{ margin: '20px 0' }}>
            <Col span={16}>{this.props.reelDetails.publishedreel.queryDescription}</Col>
            <Col span={8}>
              <ShareVideoComponent />

              <div className='rating'>
                <span className='ratingDown'>
                  {thumbDown || this.props.reelDetails.publishedreel.rating[0].noOfthumbdown}
                  <Icon
                    style={{ padding: '0 0 0 5px' }}
                    type='dislike'
                    theme='filled'
                    onClick={() => this.setRating('n')}
                  />
                </span>
                <span className='ratingUp'>
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

export default ViewReelComponent;
