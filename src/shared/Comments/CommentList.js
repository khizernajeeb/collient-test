import React from 'react';
import { Comment, List } from 'antd';
import Spinner from '../Spinner';

class CommentList extends React.Component {
  render() {
    const { comments } = this.props;
    return false ? (
      <Spinner />
    ) : (
      <List
        dataSource={comments}
        itemLayout='horizontal'
        renderItem={props => (
          <Comment
            author={props.commenter}
            content={props.commenttext}
            datetime={'on ' + props.commentdate + ' at ' + props.commenttime}
          />
        )}
      />
    );
  }
}

export default CommentList;
