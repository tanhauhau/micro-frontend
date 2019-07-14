import { Bridge } from './Bridge';
import { createBrowserHistory } from 'history';

import * as React from 'react';
import * as ReactRouter from 'react-router';
import * as ReactRouterDom from 'react-router-dom';
import * as ReactRedux from 'react-redux';

function initCommonModules() {
  Bridge.Registry.register('@module/react', React);
  Bridge.Registry.register('@module/react-router', ReactRouter);
  Bridge.Registry.register('@module/react-router-dom', ReactRouterDom);
  Bridge.Registry.register('@module/react-redux', ReactRedux);
}

function initHistory() {
  const history = createBrowserHistory();
  Bridge.Registry.register('browserHistory', history);
}

export default function() {
  initCommonModules();
  initHistory();
}
