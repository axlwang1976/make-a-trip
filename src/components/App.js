import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import TripList from './TripList';
import Trip from './Trip';
import NewTrip from './NewTrip';
import initData from '../initData';

export default class App extends Component {
  state = { trips: initData };

  findTrip = id => {
    const { trips } = this.state;
    return trips.find(trip => trip.id === id);
  };

  saveTrip = newTrip => {
    const { trips } = this.state;
    this.setState({ trips: [...trips, newTrip] });
  };

  render() {
    const { trips } = this.state;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={routeProps => <TripList trips={trips} {...routeProps} />}
        />
        <Route
          exact
          path="/trip/new"
          render={routeProps => (
            <NewTrip saveTrip={this.saveTrip} {...routeProps} trips={trips} />
          )}
        />
        <Route
          exact
          path="/trip/:id"
          render={routeProps => (
            <Trip trip={this.findTrip(routeProps.match.params.id)} />
          )}
        />
      </Switch>
    );
  }
}
