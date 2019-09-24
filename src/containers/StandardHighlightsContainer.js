import { connect } from 'react-redux';
import StandardHighlights from '../components/StandardHighlights/StandardHighlights';
import actions from '../redux/actions';

const mapStateToProps = state => {
  return {
    standardHighlights: state.standardHighlights.standardHighlights,
    standardHighlightsLoading: state.standardHighlights.standardHighlightsLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  getStandardHighlights: formData => dispatch(actions.getStandardHighlights(formData)),
});

const StandardHighlightsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StandardHighlights);

export default StandardHighlightsContainer;
