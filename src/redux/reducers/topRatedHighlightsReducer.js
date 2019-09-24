import * as types from '../actionTypes';

const initialState = { topRatedHighlightsLoading: false };

export default function launchReducer(state = initialState, action) {
  switch (action.type) {
    case types.TOP_RATED_HIGHLIGHTS_INIT: {
      return Object.assign({}, state, {
        topRatedHighlightsLoading: true,
      });
    }
    case types.TOP_RATED_HIGHLIGHTS_SUCCESS: {
      return Object.assign({}, state, {
        topRatedHighlightsLoading: false,

        topRatedHighlights: action.topRatedHighlights,
      });
    }
    default:
      return state;
  }
}
