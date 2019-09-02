import React, { Component } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

class ClipsComponent extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
    }
    return (
      <Slider {...settings}>
        {this.props.clipsInfo.map((element, index) => {
          return (
            <div key={index}>
              <img
                alt={element.thumbNailPath}
                src={'http://3.80.124.98:8080/' + element.thumbNailPath}
              />
              <p>{element.description}</p>
            </div>
          )
        })}
      </Slider>
    )
  }
}

export default ClipsComponent
