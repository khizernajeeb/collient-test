import React, { Component } from 'react';
import { BATSMAN, BOWLER, OUTCOMES, MATCHES } from '../../../configs/constants';
import { Layout } from 'antd';
import AddOutcomes from './AddOutcomes';
import BowlerListing from './BowlerListing';
import BatsmenListing from './BatsmenListing';
import MatchesListing from './MatchesListing';
import { baseFormData } from '../../../redux/sources/requestBody';
import BuildNavigation from './SharedComponents/BuildNavigation';
import Spinner from '../../../shared/Spinner';
import SelectionInfoContainer from '../../../containers/BuildHighlights/SelectionInfoContainer';

const { Content } = Layout;

// filter players bases on player type
function filterPlayers(typePlayer, players) {
  return players.filter(player => {
    return player.playerType === typePlayer;
  });
}

let formData;
function updateFormData(form_data) {
  formData = form_data;
}

// to get updated form data
function getFormData() {
  return formData;
}

class ListingArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: null,
      selectionInfo: null,
      selectedRowKeys: [],
      selectedMatches: [],
      selectedOutcomes: [],
      checkedList: [],
      clipsInfo: [],
      filteredPlayers: [],
      selectedBowlers: [],
      selectedBatsmen: [],
      selectedRows: [],
      eventName: BOWLER,
    };
    this.clickBuildHighlightsNavigation = this.clickBuildHighlightsNavigation.bind(this);
    this.setStateOfSelectedRows = this.setStateOfSelectedRows.bind(this);
  }

  componentWillReceiveProps = updatedProps => {
    if (this.props.playersInfo !== updatedProps.playersInfo) {
      this.setState({
        filteredPlayers: updatedProps.playersInfo.slice(),
      });
    }
    if (this.props.selectionInfo !== updatedProps.selectionInfo) {
      this.setState({
        selectionInfo: updatedProps.selectionInfo,
      });
    }
  };

  // to call selection info API
  getSelectionInfo = (selectedRows = null) => {
    let formData = new FormData();
    for (let key in baseFormData) {
      formData.append(key, baseFormData[key]);
    }

    selectedRows.forEach(row => {
      if (row.playerType === BATSMAN) {
        formData.append('selectedBatsmanTeamIds', row.teamId);
        formData.append('selectedBatsmanIds', row.playerId);
      } else if (row.playerType === BOWLER) {
        formData.append('selectedBowlerTeamIds', row.teamId);
        formData.append('selectedBowlerIds', row.playerId);
      } else if (row.outcomeKey) {
        formData.append(row.outcomeKey, row.outcomeValue);
      } else if (row.matchId) {
        formData.append('selectedMatchIds', row.matchId);
      }
    });
    updateFormData(formData);
    this.props.getSelectionInfo(formData);
  };

  // to concatenate all selected bowlers, batsman, matches, outcomes
  setStateOfSelectedRows = (eventName, selectedPlayers, selectedRowKeys) => {
    if (selectedPlayers) {
      let selectedRows;
      if (this.state.eventName === BOWLER) {
        selectedRows = selectedPlayers
          .concat(this.state.selectedBatsmen)
          .concat(this.state.selectedOutcomes)
          .concat(this.state.selectedMatches);
        this.setState({
          selectedBowlers: selectedPlayers,
          selectedRows,
          selectedRowKeys,
        });
      } else if (this.state.eventName === BATSMAN) {
        selectedRows = selectedPlayers
          .concat(this.state.selectedOutcomes)
          .concat(this.state.selectedMatches)
          .concat(this.state.selectedBowlers);
        this.setState({
          selectedBatsmen: selectedPlayers,
          selectedRows,
          selectedRowKeys,
        });
      } else if (this.state.eventName === OUTCOMES) {
        selectedRows = selectedPlayers
          .concat(this.state.selectedBowlers)
          .concat(this.state.selectedBatsmen)
          .concat(this.state.selectedMatches);
        this.setState({
          selectedOutcomes: selectedPlayers,
          selectedRows,
          selectedRowKeys,
        });
      } else if (this.state.eventName === MATCHES) {
        selectedRows = selectedPlayers
          .concat(this.state.selectedBowlers)
          .concat(this.state.selectedBatsmen)
          .concat(this.state.selectedOutcomes);
        this.setState({
          selectedMatches: selectedPlayers,
          selectedRows,
          selectedRowKeys,
        });
      }
      this.getSelectionInfo(selectedRows);
    }
  };

  // click on build highlights child navigation item
  clickBuildHighlightsNavigation = event => {
    event = event.key || event;
    let formData = new FormData();
    for (let key in baseFormData) {
      formData.append(key, baseFormData[key]);
    }

    // add selected rows in form data object
    if (this.state.selectedRows.length > 0 && event !== this.state.eventName) {
      this.state.selectedRows.forEach(row => {
        if (row.playerType === BATSMAN) {
          formData.append('selectedBatsmanTeamIds', row.teamId);
          formData.append('selectedBatsmanIds', row.playerId);
        } else if (row.playerType === BOWLER) {
          formData.append('selectedBowlerTeamIds', row.teamId);
          formData.append('selectedBowlerIds', row.playerId);
        } else if (row.outcomeId) {
          formData.append(row.outcomeKey, row.value);
        } else if (row.matchId) {
          formData.append('selectedMatchIds', row.matchId);
        }
      });
    }

    // call players or teams info API bases on selected page
    if (event === 'batsman' || event === 'bowler') {
      formData.append('playerType', event);
      this.props.getSearchablePlayersInfo(formData);
    } else if (event === 'matches') {
      this.props.getSearchableTeamsInfo(formData);
    }

    // set the event to current page
    this.setState({
      eventName: event,
    });
  };

  // perform action on row selection
  onChangeRowSelection = (selectedRowKeys, selectedRows = null) => {
    this.setStateOfSelectedRows(this.state.eventName, selectedRows, selectedRowKeys);
  };

  // set selected outcomes for Add Outcomes page
  setSelectedOutcomes = checkedList => {
    let selectedOutcomes = [];
    checkedList.slice().forEach(outcomeType => {
      let outcome = {};

      if (checkedList[checkedList.length - 1] === 'anyWicket') {
        checkedList = checkedList.filter(
          wicketType =>
            wicketType !== 'bowled' &&
            wicketType !== 'caught' &&
            wicketType !== 'lbw' &&
            wicketType !== 'stumped' &&
            wicketType !== 'runout' &&
            wicketType !== 'hitwicket',
        );
      } else if (
        checkedList[checkedList.length - 1] === 'bowled' ||
        checkedList[checkedList.length - 1] === 'caught' ||
        checkedList[checkedList.length - 1] === 'lbw' ||
        checkedList[checkedList.length - 1] === 'stumped' ||
        checkedList[checkedList.length - 1] === 'runout' ||
        checkedList[checkedList.length - 1] === 'hitwicket'
      ) {
        checkedList = checkedList.filter(wicketType => wicketType !== 'anyWicket');
        selectedOutcomes = selectedOutcomes.filter(outcome => outcome.outcomeKey !== 'wicketFell');
      }

      if (outcomeType === 'anyWicket') {
        outcome['outcomeKey'] = 'wicketFell';
        outcome['outcomeValue'] = true;
        selectedOutcomes = selectedOutcomes.filter(
          outcome => outcome.outcomeKey !== 'selectedWicketMethod',
        );
      } else if (outcomeType === 'bowled') {
        outcome['outcomeKey'] = 'selectedWicketMethod';
        outcome['outcomeValue'] = 'b';
      } else if (outcomeType === 'caught') {
        outcome['outcomeKey'] = 'selectedWicketMethod';
        outcome['outcomeValue'] = 'c';
      } else if (outcomeType === 'lbw') {
        outcome['outcomeKey'] = 'selectedWicketMethod';
        outcome['outcomeValue'] = 'lb';
      } else if (outcomeType === 'stumped') {
        outcome['outcomeKey'] = 'selectedWicketMethod';
        outcome['outcomeValue'] = 'st';
      } else if (outcomeType === 'runout') {
        outcome['outcomeKey'] = 'selectedWicketMethod';
        outcome['outcomeValue'] = 'ro';
      } else if (outcomeType === 'hitwicket') {
        outcome['outcomeKey'] = 'selectedWicketMethod';
        outcome['outcomeValue'] = 'hw';
      } else if (outcomeType === '6runs') {
        outcome['outcomeKey'] = 'strikerRunsScored';
        outcome['outcomeValue'] = '6';
      } else if (outcomeType === '5runs') {
        outcome['outcomeKey'] = 'strikerRunsScored';
        outcome['outcomeValue'] = '5';
      } else if (outcomeType === '4runs') {
        outcome['outcomeKey'] = 'strikerRunsScored';
        outcome['outcomeValue'] = '4';
      } else if (outcomeType === '3runs') {
        outcome['outcomeKey'] = 'strikerRunsScored';
        outcome['outcomeValue'] = '3';
      } else if (outcomeType === '2runs') {
        outcome['outcomeKey'] = 'strikerRunsScored';
        outcome['outcomeValue'] = '2';
      } else if (outcomeType === '1runs') {
        outcome['outcomeKey'] = 'strikerRunsScored';
        outcome['outcomeValue'] = '1';
      } else if (outcomeType === '0runs') {
        outcome['outcomeKey'] = 'strikerRunsScored';
        outcome['outcomeValue'] = '0';
      } else if (outcomeType === 'wide') {
        outcome['outcomeKey'] = 'deliveryTypes';
        outcome['outcomeValue'] = 'w';
      } else if (outcomeType === 'noball') {
        outcome['outcomeKey'] = 'deliveryTypes';
        outcome['outcomeValue'] = 'noball';
      }
      selectedOutcomes.push(outcome);
    });

    this.setStateOfSelectedRows(this.state.eventName, selectedOutcomes, this.state.selectedRowKeys);
    this.setState({
      checkedList: checkedList,
      selectedOutcomes,
    });
  };

  // to clear all selected rows
  clearSelectedRowsKeys = () => {
    this.setState({
      selectedRows: [],
      selectedBowlers: [],
      selectedBatsmen: [],
      selectedOutcomes: [],
      selectedMatches: [],
      selectedRowKeys: [],
      checkedList: [],
      selectionInfo: null,
    });
  };

  render() {
    const { selectedRowKeys, selectedRows } = this.state;
    const rowSelection = {
      selectedRowKeys,
      selectedRows,
      onChange: this.onChangeRowSelection,
    };
    console.log('ListingArea', this.state, this.props);
    return (
      <div style={{ padding: '0px 0' }}>
        <BuildNavigation players={this.props.players} click={this.clickBuildHighlightsNavigation} />
        <Content className='contentArea'>
          {this.props.selectionInfoLoading ? (
            <Spinner />
          ) : this.state.selectionInfo ? (
            <SelectionInfoContainer
              formData={getFormData()}
              selectionInfo={this.state.selectionInfo}
            />
          ) : null}

          {this.state.eventName === 'bowler' && (
            <BowlerListing
              players={filterPlayers(this.state.eventName, this.props.players)}
              rowSelection={rowSelection}
              isLoading={this.props.isLoading}
              playersInfoLoading={this.props.searchablePlayersInfoLoading}
              clearSelectedRowsKeys={this.clearSelectedRowsKeys}
            />
          )}
          {this.state.eventName === 'batsman' && (
            <BatsmenListing
              players={this.state.filteredPlayers}
              rowSelection={rowSelection}
              playersInfoLoading={this.props.searchablePlayersInfoLoading}
              clearSelectedRowsKeys={this.clearSelectedRowsKeys}
            />
          )}
          {this.state.eventName === 'outcomes' && (
            <AddOutcomes
              checkedList={this.state.checkedList}
              rowSelection={this.setSelectedOutcomes}
              clearSelectedRowsKeys={this.clearSelectedRowsKeys}
            />
          )}
          {this.state.eventName === 'matches' && (
            <MatchesListing
              matches={this.props.teamsInfo}
              rowSelection={rowSelection}
              teamsInoLoading={this.props.searchableTeamsInfoLoading}
              clearSelectedRowsKeys={this.clearSelectedRowsKeys}
            />
          )}
        </Content>
      </div>
    );
  }
}

export default ListingArea;
