import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const FooterComponent = () => (
  <Footer className='footer'>
    Collient, Inc. | <a href='mailto:info@collient.com'>info@collient.com</a> |{' '}
    <a href='www.collient.com'>www.collient.com</a>
  </Footer>
);

export default FooterComponent;
