import React, { Component } from 'react'

// var videojs = require('video.js')

// const videoJsOptions = {
//   autoplay: false,
//   width: 720,
//   controls: true,
//   techOrder: ['html5', 'flvjs'],
//   sources: [
//     {
//       src:
//         'http://3.80.124.98:8080/collient/getclip.htm?reelId=bf72b73e-42ba-488f-91ca-44b84193b1cc&clipType=flv',
//       type: 'video/x-flv',
//     },
//   ],
// }

class ViewReelComponent extends Component {
  render() {
    return (
      //   'http://www.mediacollege.com/video-gallery/testclips/20051210-w50s.flv',
      //   { techOrder: ['flash', 'html5'] },
      <video
        id='my_video_1'
        className='video-js vjs-default-skin'
        controls
        preload='auto'
        width='640'
        data-setup='{}'
        techOrder='["flash", "html5"]'
      >
        <source
          src='http://www.mediacollege.com/video-gallery/testclips/20051210-w50s.flv'
          type='video/x-flv'
        />
      </video>
    )
  }
}

export default ViewReelComponent
