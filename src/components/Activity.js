import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styles from '../styles/Activity.module.scss';

export default function Activity({ detail }) {
  return (
    <>
      {detail.map(act => (
        <Paper className={styles.Activity}>
          <Typography variant="h5" gutterBottom>
            {act.time}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {act.description}
          </Typography>
        </Paper>
      ))}
    </>
  );
}

Activity.propTypes = {
  detail: PropTypes.array,
};
