import * as types from '../actionTypes';

const initialState = { standardHighlightsLoading: false };

export default function launchReducer(state = initialState, action) {
  switch (action.type) {
    case types.STANDARD_HIGHLIGHTS_INIT: {
      return Object.assign({}, state, {
        standardHighlightsLoading: true,
      });
    }
    case types.STANDARD_HIGHLIGHTS_SUCCESS: {
      return Object.assign({}, state, {
        standardHighlightsLoading: false,

        standardHighlights: action.standardHighlights,
      });
    }
    default:
      return state;
  }
}
