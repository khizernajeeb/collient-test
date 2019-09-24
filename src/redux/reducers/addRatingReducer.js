import * as types from '../actionTypes';

const initialState = {};

export default function launchReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_RATING_SUCCESS: {
      return Object.assign({}, state, {
        getRating: action.getRating,
      });
    }
    default:
      return state;
  }
}
