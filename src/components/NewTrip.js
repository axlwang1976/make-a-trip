import React, { useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import arrayMove from 'array-move';
import NewTripNav from './NewTripNav';
import ActivityForm from './ActivityForm';
import DraggableActivityList from './DraggableActivityList';
import { styles } from '../styles/NewTripStyles';

function NewTrip({ saveTrip, history, classes, theme, trips }) {
  const [open, setOpen] = useState(true);

  const [activities, setActivities] = useState([]);

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  const handleSave = title => {
    const newTripName = title;
    const newTrip = {
      id: newTripName.toLowerCase().replace(/ /g, '-'),
      title: newTripName,
      coverImg: `https://source.unsplash.com/300x300/?${title}`,
      activities,
    };
    saveTrip(newTrip);
    history.push('/');
  };

  const addActivity = (time, description, actKeyword) => {
    setActivities([
      ...activities,
      {
        activityId: uuid(),
        time,
        description,
        imgSrc: `https://source.unsplash.com/300x300/?${actKeyword}`,
      },
    ]);
  };

  const deleteActivity = id => {
    const newActivities = activities.filter(
      activity => activity.activityId !== id
    );
    setActivities(newActivities);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setActivities(arrayMove(activities, oldIndex, newIndex));
  };

  return (
    <div className={classes.root}>
      <NewTripNav
        open={open}
        classes={classes}
        trips={trips}
        handleDrawerOpen={handleDrawerOpen}
        handleSave={handleSave}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        styles={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <ActivityForm addActivity={addActivity} />
      </Drawer>
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {activities.length > 0 ? (
          <DraggableActivityList
            activities={activities}
            deleteActivity={deleteActivity}
            axis="xy"
            onSortEnd={onSortEnd}
          />
        ) : (
          <Typography variant="h4">Add something...</Typography>
        )}
      </main>
    </div>
  );
}

NewTrip.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
  saveTrip: PropTypes.func,
  history: PropTypes.object,
  trips: PropTypes.array,
};

export default withStyles(styles, { withTheme: true })(NewTrip);
