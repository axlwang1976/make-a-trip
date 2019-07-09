import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styles from '../styles/Activity.module.scss';

export default function Activity() {
  return (
    <Paper className={styles.Activity}>
      <Typography variant="h5" gutterBottom>
        activity 1
      </Typography>
      <Typography variant="body1" gutterBottom>
        description
      </Typography>
    </Paper>
  );
}
