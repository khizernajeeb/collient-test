import * as types from '../actionTypes';

const initialState = {
  searchablePlayersInfoLoading: false,
};

export default function launchReducer(state = initialState, action) {
  switch (action.type) {
    case types.SEARCHABLE_PLAYERS_INFO_INIT: {
      return Object.assign({}, state, {
        searchablePlayersInfoLoading: true,
      });
    }
    case types.SEARCHABLE_PLAYERS_INFO_SUCCESS: {
      return Object.assign({}, state, {
        playersInfo: action.playersInfo,
        searchablePlayersInfoLoading: false,
      });
    }
    default:
      return state;
  }
}
