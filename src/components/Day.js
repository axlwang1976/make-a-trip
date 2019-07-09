import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Activity from './Activity';
import styles from '../styles/Day.module.scss';

export default function Day() {
  return (
    <Paper className={styles.Day}>
      <Typography variant="h4" gutterBottom>
        Day 1
      </Typography>
      <div className={styles.DayActivityList}>
        <Activity />
      </div>
    </Paper>
  );
}
