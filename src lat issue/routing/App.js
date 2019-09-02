import React from 'react';
import { Provider } from 'react-redux';
// import createHistory from 'history/';
import { createBrowserHistory } from 'history';
import store from '../redux/store';
import AppRoute from './AppRoute';
import '../styles/App.css';

const history = createBrowserHistory();

const App = () => (
  <Provider store={store} history={history}>
    <AppRoute />
  </Provider>
);
export default App;
