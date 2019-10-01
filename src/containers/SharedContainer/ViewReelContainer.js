import { connect } from 'react-redux';
import actions from '../../redux/actions';
import ViewReelComponent from '../../shared/GeneratedHighlightsModal/ViewReelComponent';

const mapStateToProps = state => {
  return {
    getRating: state.addRating.getRating,
  };
};

const mapDispatchToProps = dispatch => ({
  addRating: formData => dispatch(actions.addRating(formData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewReelComponent);
