import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { SortableElement } from 'react-sortable-hoc';
import styles from '../styles/Activity.module.scss';

const DraggableActivity = SortableElement(
  ({ activityId, time, description, imgSrc, deleteActivity }) => (
    <Paper className={`${styles.Activity} ${styles.DraggableActivity}`}>
      <Typography variant="h5" gutterBottom>
        {time}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {description}
      </Typography>
      <div className={styles.ActivityImg}>
        <img src={imgSrc} alt="img" />
      </div>
      <DeleteIcon
        className={styles.deleteIcon}
        onClick={() => deleteActivity(activityId)}
      />
    </Paper>
  )
);

DraggableActivity.propTypes = {
  activityId: PropTypes.string,
  time: PropTypes.string,
  description: PropTypes.string,
  imgSrc: PropTypes.string,
  deleteActivity: PropTypes.func,
};

export default DraggableActivity;
