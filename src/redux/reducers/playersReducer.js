import * as types from '../actionTypes';

const initialState = {
  players: [],
  isLoading: true,
};

export default function launchReducer(state = initialState, action) {
  switch (action.type) {
    case types.PLAYERS_LIST_INIT: {
      return { ...state, isLoading: true };
    }
    case types.PLAYERS_LIST_SUCCESS: {
      // return Object.assign({}, state, {
      //   players: action.players,
      //   isLoading: false,
      // });
      return { ...state, players: action.players, isLoading: false };
    }

    default:
      return state;
  }
}
