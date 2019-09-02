import React, { Component } from 'react'

class ViewReelComponent extends Component {
  render() {
    return (
      <video controls preload='auto' width='430'>
        <source
          src='http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
          type='video/mp4'
        />
      </video>
    )
  }
}

export default ViewReelComponent
