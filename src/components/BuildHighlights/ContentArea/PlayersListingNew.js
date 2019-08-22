import React, { Component } from 'react'
import { BATSMAN, BOWLER, OUTCOMES, MATCHES } from '../../../configs/constants'
import { Layout, Row, Spin } from 'antd'
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

// var data = {
//   _selectedSeriesIds: 'on',
//   _selectedPlayerSeriesId: 'on',
//   _wicketFell: 'on',
//   _selectedPlayerTeamId: 'on',
//   seriesId: 7,
//   _selectedMatchIds: 'on',
//   _deliveryTypes: 'on',
//   _selectedBatsmanIds: 'on',
//   _selectedBowlerIds: 'on',
//   _strikerRunsScored: 'on',
//   _selectedInningsIds: 'on',
//   _seriesPlayerBowler: 'on',
//   scopeRootId: 7,
//   _seriesPlayerBatsman: 'on',
//   _selectedBatsmanTeamIds: 'on',
//   scopeId: 7,
//   _selectedBowlerTeamIds: 'on',
//   scopeType: 'SERIES',
// }

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
          .concat(this.state.selectedMatches)

        this.setState({
          selectedBowlers: selectedPlayers,
          selectedRows,
        })
      } else if (this.state.eventName === 'batsman') {
        selectedRows = selectedPlayers
          .concat(this.state.selectedBowlers)
          .concat(this.state.selectedMatches)

        this.setState({
          selectedBatsmen: selectedPlayers,
          selectedRows,
        })
      } else if (this.state.eventName === 'matches') {
        selectedRows = selectedPlayers
          .concat(this.state.selectedBowlers)
          .concat(this.state.selectedBatsmen)
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
          />
          {this.props.isLoading ? (
            <Row
              type='flex'
              style={{ display: 'table', margin: '0px auto 20px' }}
            >
              <Spin tip='Loading...' />
            </Row>
          ) : //  {this.props.players ? (
          this.state.eventName === 'bowler' ? (
            this.props.searchablePlayersInfoLoading ? (
              <Row
                type='flex'
                style={{ display: 'table', margin: '0px auto 20px' }}
              >
                <Spin tip='Loading...' />
              </Row>
            ) : (
              <BowlerListing
                eventName={this.props.eventName}
                selectedBowlers={this.state.selectedBowlers}
                setSelectedPlayers={this.setSelectedPlayers}
                selectedRows={this.props.selectedRows}
                players={this.state.filteredPlayers}
                rowSelection={rowSelection}
              />
            )
          ) : this.state.eventName === 'batsman' ? (
            <BatsmenListing
              eventName={this.props.eventName}
              selectedBatsmen={this.state.selectedBatsmen}
              setSelectedPlayers={this.setSelectedPlayers}
              selectedRows={this.props.selectedRows}
              players={this.state.filteredPlayers}
              rowSelection={rowSelection}
            />
          ) : this.state.eventName === 'outcomes' ? (
            <AddOutcomes />
          ) : this.state.eventName === 'matches' ? (
            <MatchesListing
              selectedBatsmen={this.state.selectedBatsmen}
              setSelectedBatsmen={this.props.setSelectedBatsmen}
              selectedRows={this.props.selectedRows}
              matches={this.props.teamsInfo}
              rowSelection={rowSelection}
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
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSelectionInfo: (formData) => dispatch(actions.getSelectionInfo(formData)),
  getSearchableTeamsInfo: (formData) =>
    dispatch(actions.getSearchableTeamsInfo(formData)),
  getSearchablePlayersInfo: (formData) =>
    dispatch(actions.getSearchablePlayersInfo(formData)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayersListing)
