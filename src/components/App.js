import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import TripList from './TripList';
import Trip from './Trip';
import NewTrip from './NewTrip';
import initData from '../initData';

export default class App extends Component {
  state = { trips: JSON.parse(localStorage.getItem('trips')) || initData };

  findTrip = id => {
    const { trips } = this.state;
    return trips.find(trip => trip.id === id);
  };

  saveTrip = newTrip => {
    const { trips } = this.state;
    this.setState({ trips: [...trips, newTrip] }, this.syncLocalStorage);
  };

  deleteTrip = id => {
    const { trips } = this.state;
    const newTrips = trips.filter(trip => trip.id !== id);
    this.setState({ trips: newTrips }, this.syncLocalStorage);
  };

  syncLocalStorage = () => {
    const { trips } = this.state;
    localStorage.setItem('trips', JSON.stringify(trips));
  };

  render() {
    const { trips } = this.state;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={routeProps => (
            <TripList
              trips={trips}
              {...routeProps}
              deleteTrip={this.deleteTrip}
            />
          )}
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
