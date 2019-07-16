import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MiniTrip from './MiniTrip';
import styles from '../styles/TripList.module.scss';
import '../styles/fade.css';

export default function TripList({ trips, history, deleteTrip }) {
  const goToTrip = id => history.push(`/trip/${id}`);
  return (
    <div className={styles.TripList}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Typography variant="h2">MAKE-A-TRIP</Typography>
          <Button variant="contained">
            <Link to="/trip/new">Create Trip</Link>
          </Button>
        </nav>
        <TransitionGroup className={styles.trips}>
          {trips.map(trip => (
            <CSSTransition key={trip.id} classNames="fade" timeout={500}>
              <MiniTrip {...trip} goToTrip={goToTrip} deleteTrip={deleteTrip} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
}

TripList.propTypes = {
  trips: PropTypes.array,
  history: PropTypes.object,
  deleteTrip: PropTypes.func,
};
