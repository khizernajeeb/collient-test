import React, { Component } from 'react';

import { Typography, Comment } from 'antd';
import moment from 'moment';
import CommentList from './CommentList';
import CommentChild from './CommentChild';

const { Title } = Typography;

class CommentBox extends Component {
  state = {
    visible: false,
    comments: [],
    submitting: false,
    title: '',
    value: '',
  };

  componentWillReceiveProps = updatedProps => {
    if (this.props.clipComment !== updatedProps.clipComment) {
      this.setState({ clipComments: updatedProps.clipComment });
    }
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    let formData = new FormData();
    formData.append('comment', this.state.value);
    formData.append('requestId', this.props.reelRequestId);
    formData.append('userWho', this.state.title);

    this.props.addClipComment(formData);

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        title: '',
        comments: [
          {
            author: <p>{this.state.title}</p>,
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
          ...this.state.comments,
        ],
      });
    }, 1000);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  handleChangeTitle = e => {
    this.setState({
      title: e.target.value,
    });
  };

  handleReset = e => {
    this.setState({
      title: '',
      value: '',
    });
  };

  render() {
    console.log('commentbox', this.state, this.props);
    let comm;
    if (this.props.visible) {
      if (this.state.clipComments) {
        comm = this.state.clipComments.publishedreel.comments[0].comment;
      } else if (this.props.reelDetails) {
        comm = this.props.reelDetails.publishedreel.comments[0].comment;
      }
    } else {
      comm = null;
    }

    const { submitting, value, title } = this.state;
    return (
      <div>
        <Title level={4} style={{ fontSize: '17px' }}>
          Comments
        </Title>
        <div style={{ height: '140px', overflow: 'hidden', overflowY: 'auto' }}>
          {comm && (
            <CommentList reelDetailsLoading={this.props.reelDetailsLoading} comments={comm} />
          )}
        </div>
        <Comment
          content={
            <CommentChild
              onChange={this.handleChange}
              onChangeTitle={this.handleChangeTitle}
              onSubmit={this.handleSubmit}
              OnReset={this.handleReset}
              submitting={submitting}
              value={value}
              title={title}
            />
          }
        />
      </div>
    );
  }
}

export default CommentBox;
