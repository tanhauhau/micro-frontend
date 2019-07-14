import React from 'react';
import { Route } from 'react-router-dom';
import FoodDetail from './FoodDetail';

window.__BRIDGE__.Channel.publish(
  'registerRoute',
  <Route exact path="/food/:id" component={FoodDetail} />
);
