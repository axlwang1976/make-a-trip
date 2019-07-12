import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TripList from './TripList';
import Trip from './Trip';
import NewTrip from './NewTrip';
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
      <Route exact path="/trip/new" render={() => <NewTrip />} />
      <Route
        exact
        path="/trip/:id"
        render={routeProps => (
          <Trip trip={findTrip(routeProps.match.params.id)} />
        )}
      />
    </Switch>
  );
}
