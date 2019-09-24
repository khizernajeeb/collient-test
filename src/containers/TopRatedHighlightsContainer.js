import { connect } from 'react-redux';
import actions from '../redux/actions';
import TopRated from '../components/TopRatedHighlights/TopRated';

const mapStateToProps = state => {
  return {
    topRatedHighlights: state.topRatedHighlights.topRatedHighlights,
    topRatedHighlightsLoading: state.topRatedHighlights.topRatedHighlightsLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  getTopRatedHighlights: formData => dispatch(actions.getTopRatedHighlights(formData)),
});

const TopRatedHighlightsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopRated);

export default TopRatedHighlightsContainer;
