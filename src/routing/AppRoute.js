import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BuildContainer from '../containers/BuildContainer';
import HeaderComponent from '../components/HeaderFooter/HeaderComponent';
import FooterComponent from '../components/HeaderFooter/FooterComponent';

const AppRoute = () => (
  <Router>
    <HeaderComponent />
    <Switch>
      <Route path='/' exact component={BuildContainer} />
    </Switch>
    <FooterComponent />
  </Router>
);
export default AppRoute;
