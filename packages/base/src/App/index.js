import React from 'react';
import { Provider } from 'react-redux';

import Header from './Header';
import Routes, { Router } from './Routes';
import './index.css';

export default function App({ store }) {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes />
      </Router>
    </Provider>
  );
}
