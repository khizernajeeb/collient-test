import * as types from '../actionTypes';

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
  reelDetailsLoading: false,
  clipsInfoLoading: false,
  chooseCricketClipsLoading: false,
};

export default function launchReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGOUT_SUCCESS: {
      return Object.assign({}, state, {
        fullName: '',
      });
    }
    case types.USER_DETAIL_SUCCESS: {
      return Object.assign({}, state, {
        users: action.users,
      });
    }
    case types.PLAYERS_LIST_INIT: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }
    case types.PLAYERS_LIST_SUCCESS: {
      return Object.assign({}, state, {
        players: action.players,
        isLoading: false,
      });
    }
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
    case types.SELECTION_INFO_INIT: {
      return Object.assign({}, state, {
        selectionInfoLoading: true,
      });
    }
    case types.SELECTION_INFO_SUCCESS: {
      return Object.assign({}, state, {
        selectionInfo: action.selectionInfo,
        selectionInfoLoading: false,
      });
    }
    case types.CHOOSE_CRICKET_CLIPS_INIT: {
      return Object.assign({}, state, {
        chooseCricketClipsLoading: true,
      });
    }
    case types.CHOOSE_CRICKET_CLIPS_SUCCESS: {
      return Object.assign({}, state, {
        chooseCricketClips: action.chooseCricketClips,
        chooseCricketClipsLoading: false,
      });
    }
    case types.CLIPS_INFO_INIT: {
      return Object.assign({}, state, {
        clipsInfoLoading: true,
      });
    }
    case types.CLIPS_INFO_SUCCESS: {
      return Object.assign({}, state, {
        clipsInfo: action.clipsInfo,
        clipsInfoLoading: false,
      });
    }
    case types.ADD_CLIP_COMMENT_SUCCESS: {
      return Object.assign({}, state, {
        addClipComment: action.addClipComment,
      });
    }
    case types.REEL_DETAILS_INIT: {
      return Object.assign({}, state, {
        reelDetailsLoading: true,
      });
    }
    case types.REEL_DETAILS_SUCCESS: {
      return Object.assign({}, state, {
        reelDetails: action.reelDetails,
        reelDetailsLoading: false,
      });
    }
    case types.ADD_RATING_SUCCESS: {
      return Object.assign({}, state, {
        getRating: action.getRating,
      });
    }

    case types.BATSMEN_LIST_SUCCESS: {
      return Object.assign({}, state, {
        batsmen: action.batsmen,
      });
    }
    case types.BOWLER_LIST_SUCCESS: {
      return Object.assign({}, state, {
        bowler: action.bowler,
      });
    }
    default:
      return state;
  }
}
