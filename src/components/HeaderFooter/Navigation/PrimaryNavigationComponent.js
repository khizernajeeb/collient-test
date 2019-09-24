import React from 'react';
import { Menu } from 'antd';
import {
  BUILD_YOUR_OWN_HIGHLIGHTS,
  STANDARD_HIGHLIGHTS,
  MOST_VIEWED,
  TOP_RATED,
} from '../../../configs/routeNames';
import { Link, NavLink } from 'react-router-dom';

const PrimaryNavigationComponent = () => {
  return (
    <Menu className='menuHorizontal' theme='light' mode='horizontal' defaultSelectedKeys={['1']}>
      <Menu.Item key='1'>
        <Link to='/'>{BUILD_YOUR_OWN_HIGHLIGHTS}</Link>
      </Menu.Item>
      <Menu.Item key='2'>
        <NavLink to={STANDARD_HIGHLIGHTS}>Standard Highlights</NavLink>
      </Menu.Item>
      <Menu.Item key='3'>
        <NavLink to={MOST_VIEWED}>Most Viewed</NavLink>
      </Menu.Item>
      <Menu.Item key='4'>
        <NavLink to={TOP_RATED}>Top Rated</NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default PrimaryNavigationComponent;
