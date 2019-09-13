import axios from 'axios';
import {
  users,
  players,
  playerType,
  selectionInfoURL,
  searchableTeamsURL,
  searchablePlayersURL,
  chooseCricketClipsURL,
  clipsInfoURL,
  addCommentURL,
  reelDetailsURL,
  addRatingURL,
} from '../../configs/urls';
import { playersTypeRequestBody } from './requestBody';

const _ = require('lodash');
const { parseString } = require('xml2js');

export const getSource = () =>
  new Promise((resolve, reject) => {
    axios
      .get(users)
      .then(response => {
        if (response) {
          resolve(response);
        }
      })
      .catch(error => {
        reject(error);
      });
  });

export const playerDataApi = formData =>
  new Promise((resolve, reject) => {
    axios
      .post(players, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(response => {
        if (response) {
          parseString(response.data, function(err, result) {
            result = result.Players.Player.map(value => value.$);
            resolve(result);
          });
        }
      })
      .catch(error => {
        reject(error);
      });
  });

export const searchableTeamsInfoApi = formData =>
  new Promise((resolve, reject) => {
    axios
      .post(searchableTeamsURL, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(response => {
        if (response) {
          parseString(response.data, function(err, result) {
            result =
              result.Teams.Team.length > 0 ? result.Teams.Team.map(value => value.Match.map(match => Object.assign(match.$, value.$))) : result;
            result = [].concat.apply([], result);
            result = _.uniqBy(result, 'matchId');

            resolve(_.sortBy(result, o => o.matchId));
          });
        }
      })
      .catch(error => {
        reject(error);
      });
  });

export const searchablePlayersInfoApi = formData =>
  new Promise((resolve, reject) => {
    axios
      .post(searchablePlayersURL, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(response => {
        if (response) {
          parseString(response.data, function(err, result) {
            result = result.Players.Player.length > 0 ? result.Players.Player.map(value => value.$) : result;

            resolve(result);
          });
        }
      })
      .catch(error => {
        reject(error);
      });
  });

export const selectionInfoApi = formData =>
  new Promise((resolve, reject) => {
    axios
      .post(selectionInfoURL, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(response => {
        if (response) {
          resolve(response.data);
        }
      })
      .catch(error => {
        reject(error);
      });
  });

export const chooseCricketClipsApi = formData =>
  new Promise((resolve, reject) => {
    axios
      .post(chooseCricketClipsURL, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(response => {
        if (response) {
          resolve(response.data);
        }
      })
      .catch(error => {
        reject(error);
      });
  });

export const clipsInfoApi = formData =>
  new Promise((resolve, reject) => {
    axios
      .post(clipsInfoURL + formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(response => {
        if (response) {
          resolve(response.data);
        }
      })
      .catch(error => {
        reject(error);
      });
  });

export const addClipCommentApi = formData =>
  new Promise((resolve, reject) => {
    axios
      .post(addCommentURL, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(response => {
        if (response) {
          resolve(response.data);
        }
      })
      .catch(error => {
        reject(error);
      });
  });

export const reelDetailsApi = formData =>
  new Promise((resolve, reject) => {
    console.log(reelDetailsURL + formData);
    axios
      .get(reelDetailsURL + formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(response => {
        if (response) {
          parseString(response.data, function(err, result) {
            // resolve(_.sortBy(result, (o) => o.playerName))
            resolve(result);
          });
          // resolve(response.data)
        }
      })
      .catch(error => {
        reject(error);
      });
  });

export const addRatingApi = formData =>
  new Promise((resolve, reject) => {
    axios
      .post(addRatingURL, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(response => {
        if (response) {
          parseString(response.data, function(err, result) {
            // resolve(_.sortBy(result, (o) => o.playerName))
            resolve(result);
          });
          // resolve(response.data)
        }
      })
      .catch(error => {
        reject(error);
      });
  });

export const batsmenDataApi = () =>
  new Promise((resolve, reject) => {
    axios
      .post(playerType, playersTypeRequestBody('batsman'), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(response => {
        if (response) {
          parseString(response.data, function(err, result) {
            result = result.Players.Player.map(value => value.$);
            resolve(result);
          });
        }
      })
      .catch(error => {
        reject(error);
      });
  });

export const bowlerDataApi = () =>
  new Promise((resolve, reject) => {
    axios
      .post(playerType, playersTypeRequestBody('bowler'), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(response => {
        if (response) {
          parseString(response.data, function(err, result) {
            let responseData = result;
            responseData = responseData.Players.Player.map(value => value.$);
            resolve(responseData);
          });
        }
      })
      .catch(error => reject(error));
  });
