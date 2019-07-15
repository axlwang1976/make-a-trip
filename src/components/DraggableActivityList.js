import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';
import DraggableActivity from './DraggableActivity';

const DraggableActivityList = SortableContainer(
  ({ activities, deleteActivity }) => (
    <div style={{ width: '25%', display: 'flex', flexWrap: 'wrap' }}>
      {activities.map((activity, i) => (
        <DraggableActivity
          {...activity}
          key={activity.activityId}
          deleteActivity={deleteActivity}
          index={i}
        />
      ))}
    </div>
  )
);

DraggableActivityList.propTypes = {
  activities: PropTypes.array,
  deleteActivity: PropTypes.func,
};

export default DraggableActivityList;
