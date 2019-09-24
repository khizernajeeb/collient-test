import React from 'react';
import { Layout } from 'antd';
import Navigation from './Navigation/PrimaryNavigationComponent';
import logo from '../../assets/logo.png';
import 'antd/dist/antd.css';

const { Header } = Layout;

const HeaderComponent = () => (
  <Header id='header'>
    <img alt='logo' className='logo' src={logo} />
    <Navigation />
  </Header>
);

export default HeaderComponent;
