import React, { Component } from 'react';
import { FacebookShareButton, TwitterShareButton, TwitterIcon, FacebookIcon } from 'react-share';

const videoUrl =
  'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4';

class ShareComponent extends Component {
  render() {
    return (
      <div style={{ float: 'right' }}>
        <FacebookShareButton
          url={videoUrl}
          style={{
            display: 'inline-block',
            marginRight: '5px',
            cursor: 'pointer',
          }}
        >
          <FacebookIcon size={25} />
        </FacebookShareButton>
        <TwitterShareButton url={videoUrl} style={{ display: 'inline-block', cursor: 'pointer' }}>
          <TwitterIcon size={25} />
        </TwitterShareButton>
      </div>
    );
  }
}

export default ShareComponent;
