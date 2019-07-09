import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Activity from './Activity';
import styles from '../styles/Day.module.scss';

export default function Day({ trip }) {
  const { days } = trip;
  return (
    <>
      {days.map(day => (
        <Paper className={styles.Day} key={day.day}>
          <Typography variant="h4" gutterBottom>
            {`Day ${day.day}`}
          </Typography>
          <div className={styles.DayActivityList}>
            <Activity {...day} />
          </div>
        </Paper>
      ))}
    </>
  );
}

Day.propTypes = {
  trip: PropTypes.object,
};
