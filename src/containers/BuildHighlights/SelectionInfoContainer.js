import { connect } from 'react-redux';
import actions from '../../redux/actions';
import selectionInfoComponent from '../../components/BuildHighlights/SelectionInforArea/selectionInfoComponent';

const mapStateToProps = state => {
  return {
    clipsInfo: state.clipsInfo.clipsInfo,
    reelDetails: state.reelDetails.reelDetails,
    reelDetailsLoading: state.reelDetails.reelDetailsLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  getClipsInfo: formData => dispatch(actions.getClipsInfo(formData)),
  getPublishedReelDetails: formData => dispatch(actions.getPublishedReelDetails(formData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(selectionInfoComponent);
