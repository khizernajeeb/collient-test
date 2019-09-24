import { connect } from 'react-redux';
import actions from '../redux/actions';
import MostViewed from '../components/MostViewedHighlights/MostViewed';

const mapStateToProps = state => {
  return {
    mostViewedHighlights: state.mostViewedHighlights.mostViewedHighlights,
    mostViewedHighlightsLoading: state.mostViewedHighlights.mostViewedHighlightsLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  getMostViewedHighlights: formData => dispatch(actions.getMostViewedHighlights(formData)),
});

const MostViewedHighlightsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MostViewed);

export default MostViewedHighlightsContainer;
