import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TripList from './TripList';
import Trip from './Trip';
import NewTrip from './NewTrip';
import Page from './Page';
import '../styles/fade.css';

export default class App extends Component {
  state = { trips: JSON.parse(localStorage.getItem('trips')) };

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
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition classNames="fade" timeout={500} key={location.key}>
              <Switch location={location}>
                <Route
                  exact
                  path="/"
                  render={routeProps => (
                    <Page>
                      <TripList
                        trips={trips}
                        {...routeProps}
                        deleteTrip={this.deleteTrip}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/trip/new"
                  render={routeProps => (
                    <Page>
                      <NewTrip
                        saveTrip={this.saveTrip}
                        {...routeProps}
                        trips={trips}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/trip/:id"
                  render={routeProps => (
                    <Page>
                      <Trip trip={this.findTrip(routeProps.match.params.id)} />
                    </Page>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
}
