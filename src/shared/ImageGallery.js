import React, { Component } from 'react';
import { url } from '../configs/urls';
import { Icon, Row, Col } from 'antd';
import LazyLoad from 'react-lazyload';

class ImageGallery extends Component {
  render() {
    console.log('image gallery', this.state, this.props);
    return (
      <div className='imageGallery'>
        <Row type='flex' gutter={50}>
          {this.props.highlights.map((element, index) => {
            return (
              <Col span={4} key={index}>
                <LazyLoad>
                  <div
                    className='imageBox'
                    key={index}
                    onClick={() => this.props.showModal(element.publishedReelId, element.reelId)}
                  >
                    <img alt={element.thumbNail} src={url + element.thumbNail} />
                    <p style={{ margin: '5px 0' }}>
                      {element.noOfViews} views | {element.noOfClips} balls
                    </p>
                  </div>
                </LazyLoad>
                <div className='imageBoxHover'></div>
                <div className='highlightTitle'>{element.highlightTitle}</div>

                <div className='rating'>
                  <span className='ratingDown'>
                    {element.noOfthumbdown || element.noOfThumbsDown}
                    <Icon style={{ padding: '0 0 0 5px' }} type='dislike' theme='filled' />
                  </span>
                  <span className='ratingUp'>
                    {element.noOfthumbup || element.noOfThumbsUp}
                    <Icon style={{ padding: '0 0 0 5px' }} type='like' theme='filled' />
                  </span>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default ImageGallery;
