import React from 'react';
import { Layout } from 'antd';
import Navigation from './Navigation/PrimaryNavigationComponent';
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import 'antd/dist/antd.css';

const { Header } = Layout;

const HeaderComponent = () => (
  <Header id='header'>
    <NavLink to='/'>
      <img alt='logo' className='logo' src={logo} />
    </NavLink>

    <Navigation />
  </Header>
);

export default HeaderComponent;
