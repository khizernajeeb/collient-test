import {
  USER_DETAIL_SUCCESS,
  PLAYERS_LIST_SUCCESS,
  PLAYERS_LIST_INIT,
  BATSMEN_LIST_SUCCESS,
  BOWLER_LIST_SUCCESS,
  SELECTION_INFO_INIT,
  SELECTION_INFO_SUCCESS,
  SEARCHABLE_TEAMS_INFO_INIT,
  SEARCHABLE_TEAMS_INFO_SUCCESS,
  SEARCHABLE_PLAYERS_INFO_INIT,
  SEARCHABLE_PLAYERS_INFO_SUCCESS,
} from '../actionTypes'
import {
  getSource,
  playerDataApi,
  selectionInfoApi,
  batsmenDataApi,
  bowlerDataApi,
  searchableTeamsInfoApi,
  searchablePlayersInfoApi,
} from '../sources/apiCallsSources'

export const getUserDetailSuccess = (users) => {
  // console.log(users, 'action');
  return {
    type: USER_DETAIL_SUCCESS,
    users,
  }
}
export const getUserDetail = () => (dispatch) => {
  getSource()
    .then((res) => {
      const { data } = res
      dispatch(getUserDetailSuccess(data))
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getPlayerDataInit = () => {
  return {
    type: PLAYERS_LIST_INIT,
  }
}

export const getPlayerDataSuccess = (players) => {
  return {
    type: PLAYERS_LIST_SUCCESS,
    players,
  }
}
export const getPlayersData = (formData) => (dispatch) => {
  // for (var value of formData.values()) {
  //   console.log('action', value);
  // }
  dispatch(getPlayerDataInit())
  playerDataApi(formData)
    .then((res) => {
      dispatch(getPlayerDataSuccess(res))
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getSearchableTeamsInfoInit = () => {
  return {
    type: SEARCHABLE_TEAMS_INFO_INIT,
  }
}

export const getSearchableTeamsInfoSuccess = (teamsInfo) => {
  return {
    type: SEARCHABLE_TEAMS_INFO_SUCCESS,
    teamsInfo,
  }
}
export const getSearchableTeamsInfo = (formData) => (dispatch) => {
  // for (var value of formData.values()) {
  //   console.log('action', value);
  // }
  dispatch(getSearchableTeamsInfoInit())
  searchableTeamsInfoApi(formData)
    .then((res) => {
      dispatch(getSearchableTeamsInfoSuccess(res))
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getSearchablePlayersInfoInit = () => {
  return {
    type: SEARCHABLE_PLAYERS_INFO_INIT,
  }
}

export const getSearchablePlayersInfoSuccess = (playersInfo) => {
  return {
    type: SEARCHABLE_PLAYERS_INFO_SUCCESS,
    playersInfo,
  }
}
export const getSearchablePlayersInfo = (formData) => (dispatch) => {
  // for (var value of formData.values()) {
  //   console.log('action', value);
  // }
  dispatch(getSearchablePlayersInfoInit())
  searchablePlayersInfoApi(formData)
    .then((res) => {
      dispatch(getSearchablePlayersInfoSuccess(res))
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getSelectionInfoInit = () => {
  return {
    type: SELECTION_INFO_INIT,
  }
}

export const getSelectionInfoSuccess = (selectionInfo) => {
  return {
    type: SELECTION_INFO_SUCCESS,
    selectionInfo,
  }
}
export const getSelectionInfo = (formData) => (dispatch) => {
  dispatch(getSelectionInfoInit())
  selectionInfoApi(formData)
    .then((res) => {
      dispatch(getSelectionInfoSuccess(res))
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getBatsmenDataSuccess = (batsmen) => {
  return {
    type: BATSMEN_LIST_SUCCESS,
    batsmen,
  }
}
export const getBatsmenData = () => (dispatch) => {
  batsmenDataApi()
    .then((res) => {
      // console.log('dato', res);
      dispatch(getBatsmenDataSuccess(res))
    })
    .catch((err) => {
      console.log(err)
    })
}
export const getBowlerDataSuccess = (bowler) => {
  return {
    type: BOWLER_LIST_SUCCESS,
    bowler,
  }
}
export const getBowlerData = () => (dispatch) => {
  bowlerDataApi()
    .then((res) => {
      dispatch(getBowlerDataSuccess(res))
    })
    .catch((err) => {
      console.log(err)
    })
}
