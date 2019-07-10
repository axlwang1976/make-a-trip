import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MiniTrip from './MiniTrip';
import styles from '../styles/TripList.module.scss';

export default function TripList({ trips, history }) {
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
        <div className={styles.trips}>
          {trips.map(trip => (
            <MiniTrip {...trip} key={trip.id} goToTrip={goToTrip} />
          ))}
        </div>
      </div>
    </div>
  );
}

TripList.propTypes = {
  trips: PropTypes.array,
  history: PropTypes.object,
};
