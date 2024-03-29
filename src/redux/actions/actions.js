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
  CHOOSE_CRICKET_CLIPS_INIT,
  CHOOSE_CRICKET_CLIPS_SUCCESS,
  CLIPS_INFO_INIT,
  CLIPS_INFO_SUCCESS,
  ADD_CLIP_COMMENT_INIT,
  ADD_CLIP_COMMENT_SUCCESS,
  REEL_DETAILS_INIT,
  REEL_DETAILS_SUCCESS,
  ADD_RATING_SUCCESS,
  STANDARD_HIGHLIGHTS_SUCCESS,
  MOST_VIEWED_HIGHLISHTS_INIT,
  MOST_VIEWED_HIGHLISHTS_SUCCESS,
  TOP_RATED_HIGHLIGHTS_SUCCESS,
  STANDARD_HIGHLIGHTS_INIT,
  TOP_RATED_HIGHLIGHTS_INIT,
} from '../actionTypes';
import {
  getSource,
  playerDataApi,
  selectionInfoApi,
  batsmenDataApi,
  bowlerDataApi,
  searchableTeamsInfoApi,
  searchablePlayersInfoApi,
  chooseCricketClipsApi,
  clipsInfoApi,
  addClipCommentApi,
  reelDetailsApi,
  addRatingApi,
  standardHighlightsApi,
  mostViewedHighlightApi,
  topRatedHighlightsApi,
} from '../sources/apiCallsSources';

export const getUserDetailSuccess = users => {
  return {
    type: USER_DETAIL_SUCCESS,
    users,
  };
};
export const getUserDetail = () => dispatch => {
  getSource()
    .then(res => {
      const { data } = res;
      dispatch(getUserDetailSuccess(data));
    })
    .catch(err => {
      console.log(err);
    });
};

export const getPlayerDataInit = () => {
  return {
    type: PLAYERS_LIST_INIT,
  };
};

export const getPlayerDataSuccess = players => {
  return {
    type: PLAYERS_LIST_SUCCESS,
    players,
  };
};
export const getPlayersData = formData => dispatch => {
  // for (var value of formData.values()) {
  //   console.log('action', value);
  // }
  dispatch(getPlayerDataInit());
  playerDataApi(formData)
    .then(res => {
      dispatch(getPlayerDataSuccess(res));
    })
    .catch(err => {
      console.log(err);
    });
};

export const getSearchableTeamsInfoInit = () => {
  return {
    type: SEARCHABLE_TEAMS_INFO_INIT,
  };
};

export const getSearchableTeamsInfoSuccess = teamsInfo => {
  return {
    type: SEARCHABLE_TEAMS_INFO_SUCCESS,
    teamsInfo,
  };
};
export const getSearchableTeamsInfo = formData => dispatch => {
  dispatch(getSearchableTeamsInfoInit());
  searchableTeamsInfoApi(formData)
    .then(res => {
      dispatch(getSearchableTeamsInfoSuccess(res));
    })
    .catch(err => {
      console.log(err);
    });
};

export const getSearchablePlayersInfoInit = () => {
  return {
    type: SEARCHABLE_PLAYERS_INFO_INIT,
  };
};

export const getSearchablePlayersInfoSuccess = playersInfo => {
  return {
    type: SEARCHABLE_PLAYERS_INFO_SUCCESS,
    playersInfo,
  };
};
export const getSearchablePlayersInfo = formData => dispatch => {
  dispatch(getSearchablePlayersInfoInit());
  searchablePlayersInfoApi(formData)
    .then(res => {
      dispatch(getSearchablePlayersInfoSuccess(res));
    })
    .catch(err => {
      console.log(err);
    });
};

export const getSelectionInfoInit = () => {
  return {
    type: SELECTION_INFO_INIT,
  };
};

export const getSelectionInfoSuccess = selectionInfo => {
  return {
    type: SELECTION_INFO_SUCCESS,
    selectionInfo,
  };
};
export const getSelectionInfo = formData => dispatch => {
  dispatch(getSelectionInfoInit());
  selectionInfoApi(formData)
    .then(res => {
      dispatch(getSelectionInfoSuccess(res));
    })
    .catch(err => {
      console.log(err);
    });
};

export const getChooseCricketClipsInit = () => {
  return {
    type: CHOOSE_CRICKET_CLIPS_INIT,
  };
};

export const getChooseCricketClipsSuccess = chooseCricketClips => {
  return {
    type: CHOOSE_CRICKET_CLIPS_SUCCESS,
    chooseCricketClips,
  };
};
export const getChooseCricketClips = formData => dispatch => {
  dispatch(getChooseCricketClipsInit());
  chooseCricketClipsApi(formData)
    .then(res => {
      dispatch(getChooseCricketClipsSuccess(res));
    })
    .catch(err => {
      console.log(err);
    });
};

export const getClipsInfoInit = () => {
  return {
    type: CLIPS_INFO_INIT,
  };
};

export const getClipsInfoSuccess = clipsInfo => {
  return {
    type: CLIPS_INFO_SUCCESS,
    clipsInfo,
  };
};
export const getClipsInfo = formData => dispatch => {
  dispatch(getClipsInfoInit());
  clipsInfoApi(formData)
    .then(res => {
      dispatch(getClipsInfoSuccess(res));
    })
    .catch(err => {
      console.log(err);
    });
};

export const addClipCommentInit = () => {
  return {
    type: ADD_CLIP_COMMENT_INIT,
  };
};

export const addClipCommentSuccess = clipComment => {
  return {
    type: ADD_CLIP_COMMENT_SUCCESS,
    clipComment,
  };
};
export const addClipComment = formData => dispatch => {
  dispatch(addClipCommentInit());
  addClipCommentApi(formData)
    .then(res => {
      dispatch(addClipCommentSuccess(res));
    })
    .catch(err => {
      console.log(err);
    });
};

export const getPublishedReelDetailsInit = () => {
  return {
    type: REEL_DETAILS_INIT,
  };
};

export const getPublishedReelDetailsSuccess = reelDetails => {
  return {
    type: REEL_DETAILS_SUCCESS,
    reelDetails,
  };
};
export const getPublishedReelDetails = formData => dispatch => {
  dispatch(getPublishedReelDetailsInit());
  reelDetailsApi(formData)
    .then(res => {
      dispatch(getPublishedReelDetailsSuccess(res));
    })
    .catch(err => {
      console.log(err);
    });
};

export const addRatingSuccess = getRating => {
  return {
    type: ADD_RATING_SUCCESS,
    getRating,
  };
};

export const addRating = formData => dispatch => {
  addRatingApi(formData)
    .then(res => {
      dispatch(addRatingSuccess(res));
    })
    .catch(err => {
      console.log(err);
    });
};

export const getStandardHighlightsInit = () => {
  return {
    type: STANDARD_HIGHLIGHTS_INIT,
  };
};

export const getStandardHighlightsSuccess = standardHighlights => {
  return {
    type: STANDARD_HIGHLIGHTS_SUCCESS,
    standardHighlights,
  };
};
export const getStandardHighlights = formData => dispatch => {
  dispatch(getStandardHighlightsInit());
  standardHighlightsApi(formData)
    .then(res => {
      dispatch(getStandardHighlightsSuccess(res));
    })
    .catch(err => {
      console.log(err);
    });
};

export const getMostViewedHighlightsInit = () => {
  return {
    type: MOST_VIEWED_HIGHLISHTS_INIT,
  };
};

export const getMostViewedHighlightsSuccess = mostViewedHighlights => {
  return {
    type: MOST_VIEWED_HIGHLISHTS_SUCCESS,
    mostViewedHighlights,
  };
};
export const getMostViewedHighlights = formData => dispatch => {
  dispatch(getMostViewedHighlightsInit());
  mostViewedHighlightApi(formData)
    .then(res => {
      dispatch(getMostViewedHighlightsSuccess(res));
    })
    .catch(err => {
      console.log(err);
    });
};

export const getTopRatedHighlightsInit = () => {
  return {
    type: TOP_RATED_HIGHLIGHTS_INIT,
  };
};

export const getTopRatedHighlightsSuccess = topRatedHighlights => {
  return {
    type: TOP_RATED_HIGHLIGHTS_SUCCESS,
    topRatedHighlights,
  };
};
export const getTopRatedHighlights = formData => dispatch => {
  dispatch(getTopRatedHighlightsInit());
  topRatedHighlightsApi(formData)
    .then(res => {
      dispatch(getTopRatedHighlightsSuccess(res));
    })
    .catch(err => {
      console.log(err);
    });
};

export const getBatsmenDataSuccess = batsmen => {
  return {
    type: BATSMEN_LIST_SUCCESS,
    batsmen,
  };
};
export const getBatsmenData = () => dispatch => {
  batsmenDataApi()
    .then(res => {
      dispatch(getBatsmenDataSuccess(res));
    })
    .catch(err => {
      console.log(err);
    });
};
export const getBowlerDataSuccess = bowler => {
  return {
    type: BOWLER_LIST_SUCCESS,
    bowler,
  };
};
export const getBowlerData = () => dispatch => {
  bowlerDataApi()
    .then(res => {
      dispatch(getBowlerDataSuccess(res));
    })
    .catch(err => {
      console.log(err);
    });
};
