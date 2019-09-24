import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { url } from '../../configs/urls';

class CarouselClipsComponent extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
    };
    return (
      <Slider {...settings}>
        {this.props.clipsInfo.map((element, index) => {
          return (
            <div key={index} onClick={() => this.props.seekVideo(element.startTime / 1000)}>
              <img alt={element.thumbNailPath} src={url + element.thumbNailPath} />
              <p>{element.description}</p>
            </div>
          );
        })}
      </Slider>
    );
  }
}

export default CarouselClipsComponent;
