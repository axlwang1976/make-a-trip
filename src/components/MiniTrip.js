import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from '../styles/MiniTrip.module.scss';

export default function MiniTrip({ id, title, coverImg, goToTrip, openModal }) {
  const handleClick = e => {
    e.stopPropagation();
    openModal(id);
  };

  return (
    <Paper className={styles.MiniTrip} onClick={() => goToTrip(id)}>
      <DeleteIcon
        className={styles.deleteIcon}
        onClick={handleClick}
        style={{ transition: 'all 0.2s' }}
      />
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
  id: PropTypes.string,
  title: PropTypes.string,
  coverImg: PropTypes.string,
  goToTrip: PropTypes.func,
  openModal: PropTypes.func,
};
