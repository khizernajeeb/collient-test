import axios from 'axios'
import {
  users,
  players,
  playerType,
  selectionInfoURL,
  searchableTeamsURL,
  searchablePlayersURL,
} from '../../configs/urls'
import { playersTypeRequestBody } from './requestBody'

var _ = require('lodash')

let parseString = require('xml2js').parseString

export const getSource = () =>
  new Promise((resolve, reject) => {
    axios
      .get(users)
      .then((response) => {
        if (response) {
          resolve(response)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })

export const playerDataApi = (formData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(players, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        if (response) {
          parseString(response.data, function(err, result) {
            result = result.Players.Player.map((value) => value.$)

            resolve(_.sortBy(result, (o) => o.playerName))
          })
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const searchableTeamsInfoApi = (formData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(searchableTeamsURL, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        if (response) {
          parseString(response.data, function(err, result) {
            result = result.Teams.Team.map((value) =>
              value.Match.map((match) => Object.assign(match.$, value.$)),
            )
            result = [].concat.apply([], result)
            console.log('concat', result)
            result = _.uniqBy(result, 'matchId')
            console.log('uniq', result)

            resolve(_.sortBy(result, (o) => o.matchId))
          })
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const searchablePlayersInfoApi = (formData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(searchablePlayersURL, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        if (response) {
          parseString(response.data, function(err, result) {
            result = result.Players.Player.map((value) => value.$)

            resolve(_.sortBy(result, (o) => o.playerName))
          })
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const selectionInfoApi = (formData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(selectionInfoURL, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        if (response) {
          resolve(response.data)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const batsmenDataApi = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(playerType, playersTypeRequestBody('batsman'), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        if (response) {
          parseString(response.data, function(err, result) {
            result = result.Players.Player.map((value) => value.$)
            resolve(result)
          })
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const bowlerDataApi = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(playerType, playersTypeRequestBody('bowler'), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        if (response) {
          parseString(response.data, function(err, result) {
            result = result.Players.Player.map((value) => value.$)
            resolve(result)
          })
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// function batsmenRequestBody() {
//   var formData = new FormData();
//   var arr = {
//     _selectedSeriesIds: 'on',
//     _selectedPlayerSeriesId: 'on',
//     _wicketFell: 'on',
//     _selectedPlayerTeamId: 'on',
//     seriesId: 7,
//     _selectedMatchIds: 'on',
//     playerType: 'batsman',
//     _deliveryTypes: 'on',
//     _selectedBatsmanIds: 'on',
//     _selectedBowlerIds: 'on',
//     _strikerRunsScored: 'on',
//     _selectedInningsIds: 'on',
//     _seriesPlayerBowler: 'on',
//     scopeRootId: 7,
//     scopeType: 'SERIES',
//     _seriesPlayerBatsman: 'on',
//     _selectedBatsmanTeamIds: 'on',
//     scopeId: 7,
//     _selectedBowlerTeamIds: 'on',
//   };
//   for (let key in arr) {
//     formData.append(key, arr[key]);
//   }
//   return formData;
// }
