import React, { Component } from 'react'
import { Table, Button, Icon, Input } from 'antd'
import Spinner from '../../sharedComponents/Spinner'

class BowlerListing extends Component {
  getColumnSearchProps = (dataIndex, name) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node
          }}
          placeholder={`Search ${name}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type='primary'
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon='search'
          size='small'
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size='small'
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <Icon type='search' style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select())
      }
    },
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm()
    this.setState({ searchText: selectedKeys[0] })
  }

  handleReset = (clearFilters) => {
    clearFilters()
    this.setState({ searchText: '' })
  }

  bowlerColumns = [
    {
      title: 'Player Name',
      dataIndex: 'playerName',
      ...this.getColumnSearchProps('playerName', 'Player Name'),
    },
    {
      title: 'Player Type',
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
        return rec.includes(value)
      },
    },

    {
      title: 'Team Name',
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

  render() {
    return this.props.playersInfoLoading || this.props.isLoading ? (
      <Spinner />
    ) : (
      <Table
        rowSelection={this.props.rowSelection}
        columns={this.bowlerColumns}
        dataSource={this.props.players}
        // rowKey={`playerId`}
        rowKey={(record) => {
          if (!record.__uniqueId)
            record.__uniqueId = record.playerType + '_' + record.playerId
          return record.__uniqueId
        }}
      />
    )
  }
}

export default BowlerListing
