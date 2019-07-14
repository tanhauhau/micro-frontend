import React, { useMemo, useReducer, useEffect } from 'react';
import { Router as ReactRouter, Route, Switch } from 'react-router-dom';
import initialRoutes from './initialRoutes';
import { Bridge } from '../Bridge';
import FallbackDiscovery from './FallbackDiscovery';

export function Router({ children }) {
  const browserHistory = useMemo(
    () => Bridge.Registry.get('browserHistory'),
    // prettier-ignore
    [/* initialize once */]
  );

  return <ReactRouter history={browserHistory}>{children}</ReactRouter>;
}

export default function Routes() {
  const routes = useRoute();

  return (
    <Switch>
      {routes}
      <Route component={FallbackDiscovery} />
    </Switch>
  );
}

const routeReducer = (routes, newRoute) => {
  return routes.concat(
    React.cloneElement(newRoute, { key: 'async' + routes.length })
  );
};

function useRoute() {
  const [routes, registerRoute] = useReducer(routeReducer, initialRoutes);
  useEffect(() => {
    // return unsubscribe function
    return Bridge.Channel.subscribe('registerRoute', newRoute =>
      registerRoute(newRoute)
    );
  }, []);

  return routes;
}
