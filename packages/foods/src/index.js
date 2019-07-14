import React from 'react';
import { Route } from 'react-router-dom';
import FoodList from './FoodList';

window.__BRIDGE__.Channel.publish(
  'registerRoute',
  <Route exact path="/foods" component={FoodList} />
);
