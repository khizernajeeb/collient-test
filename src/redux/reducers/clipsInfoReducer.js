import * as types from '../actionTypes';

const initialState = {
  clipsInfoLoading: false,
};

export default function launchReducer(state = initialState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}
