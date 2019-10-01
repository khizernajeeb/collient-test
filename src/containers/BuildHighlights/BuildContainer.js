import { connect } from 'react-redux';
import BuildComponent from '../../components/BuildHighlights/BuildComponent';
import actions from '../../redux/actions';

const mapStateToProps = state => {
  return {
    players: state.players.players,
    isLoading: state.players.isLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  getPlayersData: formData => dispatch(actions.getPlayersData(formData)),
});

const BuildContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuildComponent);

export default BuildContainer;
