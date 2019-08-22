import { connect } from 'react-redux'
import BuildComponent from '../components/BuildHighlights/BuildComponent'
import actions from '../redux/actions'

const mapStateToProps = (state) => {
  return {
    players: state.players.players,
    batsmen: state.players.batsmen,
    bowler: state.players.bowler,
    isLoading: state.players.isLoading,
    selectionInfoLoading: state.players.selectionInfoLoading,
    searchablePlayersInfoLoading: state.players.searchablePlayersInfoLoading,
    selectionInfo: state.players.selectionInfo,
    teamsInfo: state.players.teamsInfo,
    playersInfo: state.players.playersInfo,
  }
}

const mapDispatchToProps = (dispatch) => ({
  getPlayersData: (formData) => dispatch(actions.getPlayersData(formData)),
  getBatsmenData: () => dispatch(actions.getBatsmenData()),
  getBowlerData: () => dispatch(actions.getBowlerData()),
  getSelectionInfo: (formData) => dispatch(actions.getSelectionInfo(formData)),
  getSearchableTeamsInfo: (formData) =>
    dispatch(actions.getSearchableTeamsInfo(formData)),
  getSearchablePlayersInfo: (formData) =>
    dispatch(actions.getSearchablePlayersInfo(formData)),
})

const BuildContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuildComponent)

export default BuildContainer
