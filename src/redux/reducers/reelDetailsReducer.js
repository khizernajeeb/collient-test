import * as types from '../actionTypes';

const initialState = {
  reelDetailsLoading: false,
};

export default function launchReducer(state = initialState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}
