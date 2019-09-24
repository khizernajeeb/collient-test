import * as types from '../actionTypes';

const initialState = {};

export default function launchReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_CLIP_COMMENT_SUCCESS: {
      return Object.assign({}, state, {
        clipComment: action.clipComment,
      });
    }
    default:
      return state;
  }
}
