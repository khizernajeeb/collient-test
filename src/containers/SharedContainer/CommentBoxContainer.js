import { connect } from 'react-redux';
import actions from '../../redux/actions';
import CommentBox from '../../shared/Comments/CommentBox';

const mapStateToProps = state => {
  return {
    clipComment: state.clipComment.clipComment,
    reelDetails: state.reelDetails.reelDetails,
  };
};

const mapDispatchToProps = dispatch => ({
  addClipComment: formData => dispatch(actions.addClipComment(formData)),
  getPublishedReelDetails: formData => dispatch(actions.getPublishedReelDetails(formData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentBox);
