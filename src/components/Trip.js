import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Day from './Day';
import styles from '../styles/Trip.module.scss';

export default function Trip(props) {
  const { trip } = props;
  return (
    <div className={styles.Trip}>
      <AppBar position="static" color="primary" className={styles.TripHeader}>
        <Toolbar className={styles.TripToolbar}>
          <Typography variant="h6" color="inherit">
            {trip.title}
          </Typography>
          <Button variant="contained">
            <Link to="/">Back</Link>
          </Button>
        </Toolbar>
      </AppBar>
      <Day {...props} />
    </div>
  );
}

Trip.propTypes = {
  trip: PropTypes.object,
};
