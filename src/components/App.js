import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TripList from './TripList';
import Trip from './Trip';
import initData from '../initData';

export default function App() {
  const findTrip = id => initData.find(trip => trip.id === id);
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={routeProps => <TripList trips={initData} {...routeProps} />}
      />
      <Route
        exact
        path="/trip/:id"
        render={() => <Trip trip={findTrip(1)} />}
      />
    </Switch>
  );
}
