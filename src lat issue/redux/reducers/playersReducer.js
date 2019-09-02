import * as types from '../actionTypes'

const initialState = {
  fullName: 'collient',
  userImage: '',
  loggedInTime: '',
  users: null,
  players: [],
  results: [1, 2],
  isLoading: true,
  searchableTeamsInfoLoading: false,
  selectionInfoLoading: false,
  searchablePlayersInfoLoading: false,
}

export default function launchReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGOUT_SUCCESS: {
      return Object.assign({}, state, {
        fullName: '',
      })
    }
    case types.USER_DETAIL_SUCCESS: {
      return Object.assign({}, state, {
        users: action.users,
      })
    }
    case types.PLAYERS_LIST_INIT: {
      return Object.assign({}, state, {
        isLoading: true,
      })
    }
    case types.PLAYERS_LIST_SUCCESS: {
      return Object.assign({}, state, {
        players: action.players,
        isLoading: false,
      })
    }
    case types.SEARCHABLE_TEAMS_INFO_INIT: {
      return Object.assign({}, state, {
        searchableTeamsInfoLoading: true,
      })
    }
    case types.SEARCHABLE_TEAMS_INFO_SUCCESS: {
      return Object.assign({}, state, {
        teamsInfo: action.teamsInfo,
        searchableTeamsInfoLoading: false,
      })
    }
    case types.SEARCHABLE_PLAYERS_INFO_INIT: {
      return Object.assign({}, state, {
        searchablePlayersInfoLoading: true,
      })
    }
    case types.SEARCHABLE_PLAYERS_INFO_SUCCESS: {
      return Object.assign({}, state, {
        playersInfo: action.playersInfo,
        searchablePlayersInfoLoading: false,
      })
    }
    case types.SELECTION_INFO_INIT: {
      return Object.assign({}, state, {
        selectionInfoLoading: true,
      })
    }
    case types.SELECTION_INFO_SUCCESS: {
      return Object.assign({}, state, {
        selectionInfo: action.selectionInfo,
        selectionInfoLoading: false,
      })
    }
    case types.BATSMEN_LIST_SUCCESS: {
      return Object.assign({}, state, {
        batsmen: action.batsmen,
      })
    }
    case types.BOWLER_LIST_SUCCESS: {
      return Object.assign({}, state, {
        bowler: action.bowler,
      })
    }
    default:
      return state
  }
}
