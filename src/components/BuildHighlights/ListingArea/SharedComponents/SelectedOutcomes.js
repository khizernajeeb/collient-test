import React, { Component } from 'react';

class SelectedOutcomes extends Component {
  render() {
    let selectedOutcomes;
    let { checkedList } = this.props;
    console.log('check', checkedList);
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

    console.log('sele', selectedOutcomes);

    return selectedOutcomes;
  }
}

export default SelectedOutcomes;
