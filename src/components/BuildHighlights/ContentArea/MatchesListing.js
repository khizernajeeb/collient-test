import React, { Component } from 'react'
import { Table } from 'antd'

class MatchesListing extends Component {
  bowlerColumns = [
    {
      title: 'Match Name',
      dataIndex: 'matchName',
    },
    {
      title: 'Browse By Team',
      dataIndex: 'teamName',

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
    },
  ]

  render() {
    return (
      <Table
        rowSelection={this.props.rowSelection}
        columns={this.bowlerColumns}
        dataSource={this.props.matches}
        rowKey={`matchId`}
      />
    )
  }
}

export default MatchesListing
