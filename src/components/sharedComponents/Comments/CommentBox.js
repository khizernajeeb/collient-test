import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/actions';
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

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }
    console.log(this.state);

    let formData = new FormData();
    formData.append('comment', this.state.value);
    formData.append('requestId', this.props.reelRequestId);
    formData.append('userWho', this.state.title);

    this.props.addClipComment(formData);
    this.props.getPublishedReelDetails(
      '?requestId=' + this.props.reelRequestId,
    );

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

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleChangeTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleReset = (e) => {
    this.setState({
      title: '',
      value: '',
    });
  };

  onChange = (a, b, c) => {
    console.log(a, b, c);
  };

  render() {
    console.log('commentbox', this.state, this.props);
    // const comm = this.props.reelDetails
    //   ? this.props.reelDetails.publishedreel.comments[0].comment
    //   : this.props.comments
    const comm =
      this.props.visible === false
        ? null
        : this.props.reelDetails
        ? this.props.reelDetails.publishedreel.comments[0].comment
        : this.props.comments;
    const { submitting, value, title } = this.state;
    // comments = comments.length < 1 ? this.props.comments : this.state.comments
    return (
      <div>
        <Title level={4} style={{ fontSize: '17px' }}>
          Comments
        </Title>
        {/* {comments.length > 0 && <CommentList comments={comments} />} */}
        {/* {this.props.comments && <CommentList comments={this.props.comments} />} */}
        <div style={{ height: '140px', overflow: 'hidden', overflowY: 'auto' }}>
          {comm && (
            <CommentList
              chooseCricketClips={this.props.chooseCricketClips}
              reelDetailsLoading={this.props.reelDetailsLoading}
              comments={comm}
            />
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

const mapStateToProps = (state) => {
  return {
    addClipComment: state.players.addClipComment,
    reelDetails: state.players.reelDetails,
    //reelDetailsLoading: state.players.reelDetailsLoading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addClipComment: (formData) => dispatch(actions.addClipComment(formData)),
  getPublishedReelDetails: (formData) =>
    dispatch(actions.getPublishedReelDetails(formData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentBox);

//export default CommentBox
