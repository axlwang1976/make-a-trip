import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import styles from '../styles/MiniTrip.module.scss';

export default function MiniTrip({ id, title, coverImg, goToTrip }) {
  return (
    <Paper className={styles.MiniTrip} onClick={() => goToTrip(id)}>
      <Typography variant="h5" gutterBottom className={styles.MiniTripTitle}>
        {title}
      </Typography>
      <div className={styles.MiniTripImg}>
        <img src={coverImg} alt="img" />
      </div>
    </Paper>
  );
}

MiniTrip.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  coverImg: PropTypes.string,
  goToTrip: PropTypes.func,
};