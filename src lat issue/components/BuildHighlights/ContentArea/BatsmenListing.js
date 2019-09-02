import React, { Component } from 'react'
import { Table } from 'antd'
import { BATSMAN } from '../../../configs/constants'

class BatsmenListing extends Component {
  batsmenColumns = [
    {
      title: 'Player Name',
      dataIndex: 'playerName',
    },
    {
      title: 'Browse by Hand',
      dataIndex: 'batsman_arm',
      render: (dataIndex) => (dataIndex === 'R' ? 'Right Hand' : 'Left Hand'),
      filters: [
        { text: 'Right Hand', value: 'R' },
        { text: 'Left Hand', value: 'L' },
      ],
      onFilter: (value, record) => record.batsman_arm.includes(value),
    },
    {
      title: 'Browse By Team',
      dataIndex: 'teamName',
      filters: [
        { text: 'Mumbai Indians', value: 'Mumbai Indians' },
        { text: 'Deccan Chargers', value: 'Deccan Chargers' },
        { text: 'Chennai Super Kings', value: 'Chennai Super Kings' },
        { text: 'Kolkata Knight Riders', value: 'Kolkata Knight Riders' },
        { text: 'Delhi Daredevils', value: 'Delhi Daredevils' },
        { text: 'Rajasthan Royals', value: 'Rajasthan Royals' },
        { text: 'Kings XI Punjab', value: 'Kings XI Punjab' },
        {
          text: 'Royal Challengers Bangalore',
          value: 'Royal Challengers Bangalore',
        },
      ],
      onFilter: (value, record) => record.teamName.includes(value),
    },
  ]

  rowSelection = {
    onChange: (selectedKeys, selectedRows) => {
      if (this.props.eventName === BATSMAN.toLowerCase()) {
        this.props.setSelectedPlayers(this.props.eventName, selectedRows)
      } else {
      }
    },
  }

  render() {
    return (
      <Table
        rowSelection={this.props.rowSelection}
        columns={this.batsmenColumns}
        dataSource={this.props.players}
        // rowKey={`playerId`}
        rowKey={(record) => {
          if (!record.__uniqueId)
            record.__uniqueId =
              record.playerId + ' ' + record.teamId + ' ' + record.playerType
          return record.__uniqueId
        }}
      />
    )
  }
}

export default BatsmenListing
