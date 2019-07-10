import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styles from '../styles/Activity.module.scss';

export default function Activity({ detail }) {
  return (
    <>
      {detail.map(act => (
        <Paper className={styles.Activity} key={uuid()}>
          <Typography variant="h5" gutterBottom>
            {act.time}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {act.description}
          </Typography>
          <div className={styles.ActivityImg}>
            <img src={act.imgSrc} alt="img" />
          </div>
        </Paper>
      ))}
    </>
  );
}

Activity.propTypes = {
  detail: PropTypes.array,
};
