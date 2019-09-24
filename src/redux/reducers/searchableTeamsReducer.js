import * as types from '../actionTypes';

const initialState = {
  searchableTeamsInfoLoading: false,
};

export default function launchReducer(state = initialState, action) {
  switch (action.type) {
    case types.SEARCHABLE_TEAMS_INFO_INIT: {
      return Object.assign({}, state, {
        searchableTeamsInfoLoading: true,
      });
    }
    case types.SEARCHABLE_TEAMS_INFO_SUCCESS: {
      return Object.assign({}, state, {
        teamsInfo: action.teamsInfo,
        searchableTeamsInfoLoading: false,
      });
    }
    default:
      return state;
  }
}
