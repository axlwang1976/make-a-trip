import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Trip from './Trip';

export default function App() {
  return (
    <Switch>
      {/* <Route exact path="/" render={TripList} /> */}
      <Route exact path="/trip/:id" render={Trip} />
    </Switch>
  );
}
