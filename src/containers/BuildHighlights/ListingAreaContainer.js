import { connect } from 'react-redux';
import actions from '../../redux/actions';
import ListingArea from '../../components/BuildHighlights/ListingArea/ListingArea';

const mapStateToProps = state => {
  return {
    selectionInfo: state.selectionInfo.selectionInfo,
    selectionInfoLoading: state.selectionInfo.selectionInfoLoading,
    searchableTeamsInfoLoading: state.searchableTeams.searchableTeamsInfoLoading,
    teamsInfo: state.searchableTeams.teamsInfo,
    searchablePlayersInfoLoading: state.searchablePlayers.searchablePlayersInfoLoading,
    playersInfo: state.searchablePlayers.playersInfo,
  };
};

const mapDispatchToProps = dispatch => ({
  getSelectionInfo: formData => dispatch(actions.getSelectionInfo(formData)),
  getSearchableTeamsInfo: formData => dispatch(actions.getSearchableTeamsInfo(formData)),
  getSearchablePlayersInfo: formData => dispatch(actions.getSearchablePlayersInfo(formData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListingArea);
