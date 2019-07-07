import React from 'react';
import Table from './Table';
import { Switch, Route } from 'react-router-dom';
import List from './List';
import Rating from './Rating';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path='/' component={Table} />
      <Route exact path='/rating' component={Rating} />
      <Route exact path='/list' component={List} />
    </Switch>
  );
};

export default Routes;
