import * as types from '../actionTypes';

const initialState = { mostViewedHighlightsLoading: false };

export default function launchReducer(state = initialState, action) {
  switch (action.type) {
    case types.MOST_VIEWED_HIGHLISHTS_INIT: {
      return Object.assign({}, state, {
        mostViewedHighlightsLoading: true,
      });
    }
    case types.MOST_VIEWED_HIGHLISHTS_SUCCESS: {
      return Object.assign({}, state, {
        mostViewedHighlightsLoading: false,
        mostViewedHighlights: action.mostViewedHighlights,
      });
    }
    default:
      return state;
  }
}
