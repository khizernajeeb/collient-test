import React from 'react';
import { Menu } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';

const BuildChildren = props => {
  let disabledMenu = true;
  if (props.players.length > 0) {
    disabledMenu = false;
  }

  return (
    <Router>
      <Menu onClick={props.click} defaultSelectedKeys={['bowler']} mode='horizontal' theme='dark'>
        <Menu.Item key='bowler'>Add Bowler</Menu.Item>
        <Menu.Item key='batsman' disabled={disabledMenu}>
          Add Batsman
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
