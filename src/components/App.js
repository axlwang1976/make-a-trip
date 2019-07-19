import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TripList from './TripList';
import Trip from './Trip';
import NewTrip from './NewTrip';
import Page from './Page';
import '../styles/fade.css';

export default function App() {
  const initTrips = JSON.parse(localStorage.getItem('trips') || '[]');

  const [trips, setTrips] = useState(initTrips);

  useEffect(() => {
    localStorage.setItem('trips', JSON.stringify(trips));
  }, [trips]);

  const findTrip = id => trips.find(trip => trip.id === id);

  const saveTrip = newTrip => setTrips([...trips, newTrip]);

  const deleteTrip = id => {
    const newTrips = trips.filter(trip => trip.id !== id);
    setTrips(newTrips);
  };

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
                      deleteTrip={deleteTrip}
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
                      saveTrip={saveTrip}
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
                    <Trip trip={findTrip(routeProps.match.params.id)} />
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
