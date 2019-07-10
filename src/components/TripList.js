import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import MiniTrip from './MiniTrip';
import styles from '../styles/TripList.module.scss';

export default function TripList({ trips, history }) {
  const goToTrip = id => history.push(`/trip/${id}`);
  return (
    <div className={styles.TripList}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Typography variant="h2" gutterBottom>
            MAKE-A-TRIP
          </Typography>
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
