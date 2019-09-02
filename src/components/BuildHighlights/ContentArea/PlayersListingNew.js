import React, { Component } from 'react'
import { BATSMAN, BOWLER, OUTCOMES, MATCHES } from '../../../configs/constants'
import { Layout } from 'antd'
import AddOutcomes from './AddOutcomes'
import BowlerListing from './BowlerListing'
import { connect } from 'react-redux'
import actions from '../../../redux/actions'
import BatsmenListing from './BatsmenListing'
import MatchesListing from './MatchesListing'
import { baseFormData } from '../../../redux/sources/requestBody'
import SelectionInfo from '../../BuildHighlights/selectionInfoComponent'
import BuildNavigation from '../../Navigation/BuildNavigation'

const { Content } = Layout

function filterPlayers(typePlayer, players) {
  return players.filter((player) => {
    return player.playerType === typePlayer.toLowerCase()
  })
}

class PlayersListing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: null,
      eventName: BOWLER.toLowerCase(),
      filteredPlayers: [],
      selectedBowlers: [],
      selectedBatsmen: [],
      selectedRows: [],
      searchText: '',
      uniqueId: 0,
      selectedRowKeys: [],
      selectedMatches: [],
      selectedOutcomes: [],
      checkedList: [],
      clipsInfo: [],
    }
    this.onclickMenu = this.onclickMenu.bind(this)
    this.setSelectedPlayers = this.setSelectedPlayers.bind(this)
  }

  componentWillReceiveProps = (updatedProps) => {
    if (this.props.players !== updatedProps.players) {
      this.setState({
        filteredPlayers: filterPlayers(
          this.state.eventName,
          updatedProps.players,
        ),
      })
    }
    if (this.props.playersInfo !== updatedProps.playersInfo) {
      this.setState({
        filteredPlayers: updatedProps.playersInfo.slice(),
      })
    }

    if (this.props.chooseCricketClips !== updatedProps.chooseCricketClips) {
      this.props.getClipsInfo(
        '?reelId=' + updatedProps.chooseCricketClips.reelId,
      )
      this.setState({
        reelId: updatedProps.chooseCricketClips.reelId,
      })
    }

    if (this.props.clipsInfo !== updatedProps.clipsInfo) {
      this.setState({
        clipsInfo: updatedProps.clipsInfo,
      })
    }

    if (this.props.selectionInfo !== updatedProps.selectionInfo) {
      this.setState({
        selectionInfo: updatedProps.selectionInfo,
      })
    }
  }

  getSelectionInfo = (selectedRows = null) => {
    let formData = new FormData()
    for (let key in baseFormData) {
      formData.append(key, baseFormData[key])
    }

    selectedRows.forEach((row) => {
      if (row.playerType === BATSMAN.toLowerCase()) {
        formData.append('selectedBatsmanTeamIds', row.teamId)
        formData.append('selectedBatsmanIds', row.playerId)
      } else if (row.playerType === BOWLER.toLowerCase()) {
        formData.append('selectedBowlerTeamIds', row.teamId)
        formData.append('selectedBowlerIds', row.playerId)
      } else if (row.outcomeKey) {
        formData.append(row.outcomeKey, row.outcomeValue)
      } else if (row.matchId) {
        formData.append('selectedMatchIds', row.matchId)
      }
    })

    this.props.getSelectionInfo(formData)

    return formData
  }

  setSelectedPlayers = (eventName, selectedPlayers) => {
    if (selectedPlayers) {
      let selectedRows
      if (this.state.eventName === 'bowler') {
        selectedRows = selectedPlayers
          .concat(this.state.selectedBatsmen)
          .concat(this.state.selectedOutcomes)
          .concat(this.state.selectedMatches)

        this.setState({
          selectedBowlers: selectedPlayers,
          selectedRows,
        })
      } else if (this.state.eventName === 'batsman') {
        selectedRows = selectedPlayers
          .concat(this.state.selectedOutcomes)
          .concat(this.state.selectedMatches)
          .concat(this.state.selectedBowlers)

        this.setState({
          selectedBatsmen: selectedPlayers,
          selectedRows,
        })
      } else if (this.state.eventName === 'outcomes') {
        selectedRows = selectedPlayers
          .concat(this.state.selectedBowlers)
          .concat(this.state.selectedBatsmen)
          .concat(this.state.selectedMatches)
        this.setState({
          selectedOutcomes: selectedPlayers,
          selectedRows,
        })
      } else if (this.state.eventName === 'matches') {
        selectedRows = selectedPlayers
          .concat(this.state.selectedBowlers)
          .concat(this.state.selectedBatsmen)
          .concat(this.state.selectedOutcomes)
        this.setState({
          selectedMatches: selectedPlayers,
          selectedRows,
        })
      }
      this.getSelectionInfo(selectedRows)
    }
  }

  onclickMenu = (event) => {
    let formData = new FormData()
    for (let key in baseFormData) {
      formData.append(key, baseFormData[key])
    }
    if (
      this.state.selectedRows.length > 0 &&
      event.key !== this.state.eventName
    ) {
      this.state.selectedRows.forEach((row) => {
        if (row.playerType === BATSMAN.toLowerCase()) {
          console.log('bats', BATSMAN.toLowerCase())
          formData.append('selectedBatsmanTeamIds', row.teamId)
          formData.append('selectedBatsmanIds', row.playerId)
        } else if (row.playerType === BOWLER.toLowerCase()) {
          console.log('bowl', BOWLER.toLowerCase())
          formData.append('selectedBowlerTeamIds', row.teamId)
          formData.append('selectedBowlerIds', row.playerId)
        } else if (row.outcomeId) {
          formData.append(row.outcomeKey, row.value)
        } else if (row.matchId) {
          formData.append('selectedMatchIds', row.matchId)
        }
      })
    }
    let eventType = ''
    switch (event.key) {
      case BATSMAN.toLowerCase():
        eventType = BATSMAN
        break
      case BOWLER.toLowerCase():
        eventType = BOWLER
        break
      case OUTCOMES.toLowerCase():
        eventType = OUTCOMES
        break
      case MATCHES.toLowerCase():
        eventType = MATCHES
        break
      default:
        break
    }
    if (event.key === 'batsman' || event.key === 'bowler') {
      formData.append('playerType', eventType.toLowerCase())
      this.props.getSearchablePlayersInfo(formData)
    } else if (event.key === 'matches') {
      this.props.getSearchableTeamsInfo(formData)
    }

    this.setState({
      eventName: eventType.toLowerCase(),
    })
  }

  onSelectChange = (selectedRowKeys, selectedRows = null) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows)

    this.setState(
      { selectedRowKeys },

      this.setSelectedPlayers(this.state.eventName, selectedRows),
    )
  }

  onChanges = (checkedList) => {
    let selectedOutcomes = []

    checkedList.slice().forEach((outcomeType) => {
      let outcome = {}

      if (checkedList[checkedList.length - 1] === 'anyWicket') {
        checkedList = checkedList.filter(
          (wicketType) =>
            wicketType !== 'bowled' &&
            wicketType !== 'caught' &&
            wicketType !== 'lbw' &&
            wicketType !== 'stumped' &&
            wicketType !== 'runout' &&
            wicketType !== 'hitwicket',
        )
      } else if (
        checkedList[checkedList.length - 1] === 'bowled' ||
        checkedList[checkedList.length - 1] === 'caught' ||
        checkedList[checkedList.length - 1] === 'lbw' ||
        checkedList[checkedList.length - 1] === 'stumped' ||
        checkedList[checkedList.length - 1] === 'runout' ||
        checkedList[checkedList.length - 1] === 'hitwicket'
      ) {
        checkedList = checkedList.filter(
          (wicketType) => wicketType !== 'anyWicket',
        )
        selectedOutcomes = selectedOutcomes.filter(
          (outcome) => outcome.outcomeKey !== 'wicketFell',
        )
      }

      console.log(outcomeType)

      if (outcomeType === 'anyWicket') {
        outcome['outcomeKey'] = 'wicketFell'
        outcome['outcomeValue'] = true
        selectedOutcomes = selectedOutcomes.filter(
          (outcome) => outcome.outcomeKey !== 'selectedWicketMethod',
        )
      } else if (outcomeType === 'bowled') {
        outcome['outcomeKey'] = 'selectedWicketMethod'
        outcome['outcomeValue'] = 'b'
      } else if (outcomeType === 'caught') {
        outcome['outcomeKey'] = 'selectedWicketMethod'
        outcome['outcomeValue'] = 'c'
      } else if (outcomeType === 'lbw') {
        outcome['outcomeKey'] = 'selectedWicketMethod'
        outcome['outcomeValue'] = 'lb'
      } else if (outcomeType === 'stumped') {
        outcome['outcomeKey'] = 'selectedWicketMethod'
        outcome['outcomeValue'] = 'st'
      } else if (outcomeType === 'runout') {
        outcome['outcomeKey'] = 'selectedWicketMethod'
        outcome['outcomeValue'] = 'ro'
      } else if (outcomeType === 'hitwicket') {
        outcome['outcomeKey'] = 'selectedWicketMethod'
        outcome['outcomeValue'] = 'hw'
      } else if (outcomeType === '6runs') {
        outcome['outcomeKey'] = 'strikerRunsScored'
        outcome['outcomeValue'] = '6'
      } else if (outcomeType === '5runs') {
        outcome['outcomeKey'] = 'strikerRunsScored'
        outcome['outcomeValue'] = '5'
      } else if (outcomeType === '4runs') {
        outcome['outcomeKey'] = 'strikerRunsScored'
        outcome['outcomeValue'] = '4'
      } else if (outcomeType === '3runs') {
        outcome['outcomeKey'] = 'strikerRunsScored'
        outcome['outcomeValue'] = '3'
      } else if (outcomeType === '2runs') {
        outcome['outcomeKey'] = 'strikerRunsScored'
        outcome['outcomeValue'] = '2'
      } else if (outcomeType === '1runs') {
        outcome['outcomeKey'] = 'strikerRunsScored'
        outcome['outcomeValue'] = '1'
      } else if (outcomeType === '0runs') {
        outcome['outcomeKey'] = 'strikerRunsScored'
        outcome['outcomeValue'] = '0'
      } else if (outcomeType === 'wide') {
        outcome['outcomeKey'] = 'deliveryTypes'
        outcome['outcomeValue'] = 'w'
      } else if (outcomeType === 'noball') {
        outcome['outcomeKey'] = 'deliveryTypes'
        outcome['outcomeValue'] = 'noball'
      }
      selectedOutcomes.push(outcome)
      //selectedOutcomes = _.uniqBy(selectedOutcomes, 'outcomeId')
    })

    this.setSelectedPlayers(this.state.eventName, selectedOutcomes)
    this.setState({
      checkedList: checkedList,
      selectedOutcomes,
    })
  }

  showModal = () => {
    let formData = new FormData()
    for (let key in baseFormData) {
      formData.append(key, baseFormData[key])
    }

    this.state.selectedRows.forEach((row) => {
      if (row.playerType === BATSMAN.toLowerCase()) {
        formData.append('selectedBatsmanTeamIds', row.teamId)
        formData.append('selectedBatsmanIds', row.playerId)
      } else if (row.playerType === BOWLER.toLowerCase()) {
        formData.append('selectedBowlerTeamIds', row.teamId)
        formData.append('selectedBowlerIds', row.playerId)
      } else if (row.outcomeKey) {
        formData.append(row.outcomeKey, row.outcomeValue)
      } else if (row.matchId) {
        formData.append('selectedMatchIds', row.matchId)
      }
    })
    this.props.getChooseCricketClips(formData)
    this.setState({
      visible: true,
    })
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  render() {
    const { selectedRowKeys, selectedRows } = this.state
    const rowSelection = {
      selectedRowKeys,
      selectedRows,
      onChange: this.onSelectChange,
    }

    console.log('NewPlayerRender', this.state, this.props)
    return (
      <div style={{ padding: '0px 0' }}>
        <BuildNavigation
          players={this.props.players}
          click={this.onclickMenu}
        />
        <Content
          style={{
            padding: '25px 24px',
            margin: 0,
            minHeight: 280,
          }}
        >
          <SelectionInfo
            selectionInfoLoading={this.props.selectionInfoLoading}
            selectionInfo={this.state.selectionInfo}
            showModal={this.showModal}
            visible={this.state.visible}
            clipsInfo={this.state.clipsInfo}
            closeModal={this.handleCancel}
          />

          {this.state.eventName === 'bowler' ? (
            <BowlerListing
              eventName={this.props.eventName}
              selectedBowlers={this.state.selectedBowlers}
              setSelectedPlayers={this.setSelectedPlayers}
              selectedRows={this.props.selectedRows}
              players={this.state.filteredPlayers}
              rowSelection={rowSelection}
              isLoading={this.props.isLoading}
              playersInfoLoading={this.props.searchablePlayersInfoLoading}
            />
          ) : this.state.eventName === 'batsman' ? (
            <BatsmenListing
              eventName={this.props.eventName}
              selectedBatsmen={this.state.selectedBatsmen}
              setSelectedPlayers={this.setSelectedPlayers}
              selectedRows={this.props.selectedRows}
              players={this.state.filteredPlayers}
              rowSelection={rowSelection}
              playersInfoLoading={this.props.searchablePlayersInfoLoading}
            />
          ) : this.state.eventName === 'outcomes' ? (
            <AddOutcomes
              checkedList={this.state.checkedList}
              rowSelection={this.onChanges}
            />
          ) : this.state.eventName === 'matches' ? (
            <MatchesListing
              selectedBatsmen={this.state.selectedBatsmen}
              setSelectedBatsmen={this.props.setSelectedBatsmen}
              selectedRows={this.props.selectedRows}
              matches={this.props.teamsInfo}
              rowSelection={rowSelection}
              teamsInoLoading={this.props.searchableTeamsInfoLoading}
            />
          ) : null}
        </Content>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectionInfo: state.players.selectionInfo,
    selectionInfoLoading: state.players.selectionInfoLoading,
    searchableTeamsInfoLoading: state.players.searchableTeamsInfoLoading,
    searchablePlayersInfoLoading: state.players.searchablePlayersInfoLoading,
    teamsInfo: state.players.teamsInfo,
    playersInfo: state.players.playersInfo,
    chooseCricketClips: state.players.chooseCricketClips,
    clipsInfo: state.players.clipsInfo,
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSelectionInfo: (formData) => dispatch(actions.getSelectionInfo(formData)),
  getSearchableTeamsInfo: (formData) =>
    dispatch(actions.getSearchableTeamsInfo(formData)),
  getSearchablePlayersInfo: (formData) =>
    dispatch(actions.getSearchablePlayersInfo(formData)),
  getChooseCricketClips: (formData) =>
    dispatch(actions.getChooseCricketClips(formData)),
  getClipsInfo: (formData) => dispatch(actions.getClipsInfo(formData)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayersListing)
