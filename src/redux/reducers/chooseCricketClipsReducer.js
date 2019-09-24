import * as types from '../actionTypes';

const initialState = {
  chooseCricketClipsLoading: false,
};

export default function launchReducer(state = initialState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}
