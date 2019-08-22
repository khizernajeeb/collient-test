import React, { Component } from 'react'
import { Table } from 'antd'
import { BOWLER } from '../../../configs/constants'

class BowlerListing extends Component {
  bowlerColumns = [
    {
      title: 'Player Name',
      dataIndex: 'playerName',
      //   ...this.getColumnSearchProps('playerName', 'Player Name'),
    },
    {
      title: 'Browse By Type',
      dataIndex: 'bowler_arm',
      bowler_delivery_type: 'bowler_delivery_type',
      render: (dataIndex, record) => {
        if (dataIndex === 'R') {
          if (record.bowler_delivery_type === 'F') {
            return 'Right Arm Pace'
          } else if (record.bowler_delivery_type === 'OS') {
            return 'Right Arm Off-Spin'
          } else if (record.bowler_delivery_type === 'LS') {
            return 'Right Arm Leg-Spin'
          } else if (record.bowler_delivery_type === 'M') {
            return 'Right Arm Medium'
          }
        } else if (dataIndex === 'L') {
          if (record.bowler_delivery_type === 'F') {
            return 'Left Arm Pace'
          } else if (record.bowler_delivery_type === 'M') {
            return 'Left Arm Medium'
          } else {
            return 'Left Arm Orthodox'
          }
        } else {
          return 'Right Arm Medium'
        }
      },
      filters: [
        { text: 'Right Arm Pace', value: 'RF' },
        { text: 'Left Arm Pace', value: 'LF' },
        { text: 'Right Arm Medium', value: 'RM' },
        { text: 'Left Arm Medium', value: 'LM' },
        { text: 'Right Arm Off-Spin', value: 'ROS' },
        { text: 'Right Arm Leg-Spin', value: 'RLS' },
        { text: 'Left Arm Orthodox', value: 'LAO' },
      ],
      onFilter: (value, record) => {
        let rec = record.bowler_arm + record.bowler_delivery_type

        console.log(rec.includes(value))
        return rec.includes(value)
      },

      // ...this.getColumnSearchProps('bowler_arm', 'Bowler Arm'),
    },

    {
      title: 'Browse By Team',
      dataIndex: 'teamName',
      // ...this.getColumnSearchProps('teamName', 'Team Name'),
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
    onChange: (selectedRowKeys, selectedRows) => {
      if (this.props.eventName === BOWLER.toLowerCase()) {
        this.props.setSelectedPlayers(this.props.eventName, selectedRows)
      } else {
        //   this.props.setSelectedBatsmen(selectedRows)
      }
    },

    // getCheckboxProps: (record) => ({
    //   checked: record.playerId == '478', // Column configuration not to be checked
    // }),
  }
  render() {
    return (
      <Table
        rowSelection={this.props.rowSelection}
        columns={this.bowlerColumns}
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

export default BowlerListing
