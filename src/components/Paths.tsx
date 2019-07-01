import React from 'react';
import Table from './table/Table';
import { Switch, Route } from 'react-router-dom';
import Chart from './Chart';
import Rating from './Rating';

const Paths: React.FC = () => {
  return (
    <Switch>
      <Route exact path='/' component={Table} />
      <Route exact path='/rating' component={Rating} />
      <Route exact path='/chart' component={Chart} />
    </Switch>
  );
};

export default Paths;
