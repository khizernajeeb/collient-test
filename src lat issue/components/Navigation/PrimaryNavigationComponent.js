import React from 'react'
import { Menu } from 'antd'
import {
  BUILD_YOUR_OWN_HIGHLIGHTS,
  STANDARD_HIGHLIGHTS,
  MOST_VIEWED,
  TOP_RATED,
} from '../../configs/routeNames'
import { Link } from 'react-router-dom'

const PrimaryNavigationComponent = () => {
  return (
    <Menu
      theme='dark'
      mode='horizontal'
      defaultSelectedKeys={['1']}
      style={{ lineHeight: '81px', fontSize: '15px' }}
    >
      <Menu.Item key='1'>
        <Link to='/'>{BUILD_YOUR_OWN_HIGHLIGHTS}</Link>
      </Menu.Item>
      <Menu.Item key='2'>
        <Link to='/'>{STANDARD_HIGHLIGHTS}</Link>
      </Menu.Item>
      <Menu.Item key='3'>
        <Link to='/'>{MOST_VIEWED}</Link>
      </Menu.Item>
      <Menu.Item key='4'>
        <Link to='/'>{TOP_RATED}</Link>
      </Menu.Item>
    </Menu>
  )
}

export default PrimaryNavigationComponent
