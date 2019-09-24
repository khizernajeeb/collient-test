import { combineReducers } from 'redux';
import playersReducer from './playersReducer';
import selectionInfoReducer from './selectionInfoReducer';
import addRatingReducer from './addRatingReducer';
import chooseCricketClipsReducer from './chooseCricketClipsReducer';
import clipCommentReducer from './clipCommentReducer';
import clipsInfoReducer from './clipsInfoReducer';
import reelDetailsReducer from './reelDetailsReducer';
import searchablePlayersReducer from './searchablePlayersReducer';
import searchableTeamsReducer from './searchableTeamsReducer';
import standardHighlightsReducer from './standardHighlightsReducer';
import mostViewedHighlightsReducer from './mostViewedHighlightsReducer';
import topRatedHighlightsReducer from './topRatedHighlightsReducer';

const rootReducer = combineReducers({
  players: playersReducer,
  selectionInfo: selectionInfoReducer,
  addRating: addRatingReducer,
  chooseClips: chooseCricketClipsReducer,
  clipComment: clipCommentReducer,
  clipsInfo: clipsInfoReducer,
  reelDetails: reelDetailsReducer,
  searchablePlayers: searchablePlayersReducer,
  searchableTeams: searchableTeamsReducer,
  standardHighlights: standardHighlightsReducer,
  mostViewedHighlights: mostViewedHighlightsReducer,
  topRatedHighlights: topRatedHighlightsReducer,
});

export default rootReducer;
