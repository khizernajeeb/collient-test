import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BuildContainer from '../containers/BuildHighlights/BuildContainer';
import HeaderComponent from '../components/HeaderFooter/HeaderComponent';
import FooterComponent from '../components/HeaderFooter/FooterComponent';
import StandardHighlightsContainer from '../containers/StandardHighlightsContainer';
import MostViewedHighlightsContainer from '../containers/MostViewedHighlightsContainer';
import TopRatedHighlightsContainer from '../containers/TopRatedHighlightsContainer';

const AppRoute = () => (
  <Router>
    <HeaderComponent />
    <Switch>
      <Route path='/' exact component={BuildContainer} />
      <Route path='/standard_highlights' exact component={StandardHighlightsContainer} />
      <Route path='/most_viewed' exact component={MostViewedHighlightsContainer} />
      <Route path='/top_rated' exact component={TopRatedHighlightsContainer} />
    </Switch>
    <FooterComponent />
  </Router>
);
export default AppRoute;
