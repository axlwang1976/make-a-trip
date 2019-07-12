import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styles from '../styles/Activity.module.scss';

export default function Activity({ time, description, imgSrc }) {
  return (
    <Paper className={styles.Activity} key={uuid()}>
      <Typography variant="h5" gutterBottom>
        {time}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {description}
      </Typography>
      <div className={styles.ActivityImg}>
        <img src={imgSrc} alt="img" />
      </div>
    </Paper>
  );
}

Activity.propTypes = {
  time: PropTypes.string,
  description: PropTypes.string,
  imgSrc: PropTypes.string,
};
