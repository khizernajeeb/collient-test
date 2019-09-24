import * as types from '../actionTypes';

const initialState = {
  selectionInfoLoading: false,
};

export default function launchReducer(state = initialState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}
