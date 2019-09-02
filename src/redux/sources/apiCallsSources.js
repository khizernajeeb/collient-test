import axios from 'axios'
import {
  users,
  players,
  playerType,
  selectionInfoURL,
  searchableTeamsURL,
  searchablePlayersURL,
  chooseCricketClipsURL,
  clipsInfoURL,
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

            // resolve(_.sortBy(result, (o) => o.playerName))
            resolve(result)
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

            resolve(result)
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

export const chooseCricketClipsApi = (formData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(chooseCricketClipsURL, formData, {
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

export const clipsInfoApi = (formData) => {
  return new Promise((resolve, reject) => {
    console.log(clipsInfoURL + formData)
    axios
      .post(clipsInfoURL + formData, {
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
