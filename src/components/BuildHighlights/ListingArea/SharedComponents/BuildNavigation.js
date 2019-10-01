/*
 * Build Your Own Highlights page child Navigation
 */

import React from 'react';
import { Menu } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';

// disabled child navigation till Api not getting the data
let disabledMenu = true;
const BuildChildren = props => {
  if (props.players.length > 0) {
    disabledMenu = false;
  }

  return (
    <Router>
      <Menu onClick={props.click} defaultSelectedKeys={['bowler']} mode='horizontal' theme='dark'>
        <Menu.Item key='bowler'>Add Bowler</Menu.Item>
        <Menu.Item key='batsman' disabled={disabledMenu}>
          Add Batsmen
        </Menu.Item>
        <Menu.Item key='outcomes' disabled={disabledMenu}>
          Add Outcomes
        </Menu.Item>
        <Menu.Item key='matches' disabled={disabledMenu}>
          Add Matches
        </Menu.Item>
      </Menu>
    </Router>
  );
};

export default BuildChildren;
