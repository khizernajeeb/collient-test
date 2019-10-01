import React, { Component } from 'react';
import { Table, Button, Icon, Input } from 'antd';
import Spinner from '../../../shared/Spinner';
import ClearAllFilterButton from './SharedComponents/ClearAllFilterButton';

let clearInputFilter = Function;

class MatchesListing extends Component {
  state = {
    filteredInfo: null,
  };

  getColumnSearchProps = (dataIndex, name) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${name}`}
          value={selectedKeys[0]}
          onChange={e => {
            clearInputFilter = clearFilters;
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
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
        <Button onClick={() => this.handleReset(clearFilters)} size='small' style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type='search' style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  clearAllFilters = () => {
    if (this.state.searchText) {
      clearInputFilter();
    }
    if (this.state.filteredInfo !== null) {
      this.setState({ filteredInfo: null, searchText: '' });
    }
    if (this.props.rowSelection.selectedRowKeys.length > 0) {
      this.props.clearSelectedRowsKeys();
    }
  };

  setFilterValues = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
    });
  };

  render() {
    let { filteredInfo } = this.state;
    filteredInfo = filteredInfo || {};

    const matchesColumns = [
      {
        title: 'Match Name',
        dataIndex: 'matchName',
        ...this.getColumnSearchProps('matchName', 'Match Name'),
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
        filteredValue: filteredInfo.teamName || null,

        onFilter: (value, record) => record.teamName.includes(value),
      },
    ];
    return this.props.teamsInoLoading ? (
      <Spinner />
    ) : (
      <>
        <ClearAllFilterButton clearAllFilters={this.clearAllFilters} />
        <Table
          onChange={this.setFilterValues}
          rowSelection={this.props.rowSelection}
          columns={matchesColumns}
          dataSource={this.props.matches}
          rowKey={record => {
            if (!record.__uniqueId) record.__uniqueId = 'match_' + record.matchId;
            return record.__uniqueId;
          }}
        />
      </>
    );
  }
}

export default MatchesListing;
