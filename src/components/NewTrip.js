import React, { Component } from 'react';
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

class NewTrip extends Component {
  state = {
    open: true,
    activities: [],
  };

  handleDrawerOpen = () => this.setState({ open: true });

  handleDrawerClose = () => this.setState({ open: false });

  handleSave = title => {
    const { saveTrip, history } = this.props;
    const { activities } = this.state;
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

  addActivity = (time, description, actKeyword) => {
    const { activities } = this.state;
    this.setState({
      activities: [
        ...activities,
        {
          activityId: uuid(),
          time,
          description,
          imgSrc: `https://source.unsplash.com/300x300/?${actKeyword}`,
        },
      ],
    });
  };

  deleteActivity = id => {
    const { activities } = this.state;
    const newActivities = activities.filter(
      activity => activity.activityId !== id
    );
    this.setState({ activities: newActivities });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ activities }) => ({
      activities: arrayMove(activities, oldIndex, newIndex),
    }));
  };

  render() {
    const { classes, theme, trips } = this.props;
    const { open, activities } = this.state;
    return (
      <div className={classes.root}>
        <NewTripNav
          open={open}
          classes={classes}
          trips={trips}
          handleDrawerOpen={this.handleDrawerOpen}
          handleSave={this.handleSave}
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
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <ActivityForm addActivity={this.addActivity} />
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
              deleteActivity={this.deleteActivity}
              axis="xy"
              onSortEnd={this.onSortEnd}
            />
          ) : (
            <Typography variant="h4">Add something...</Typography>
          )}
        </main>
      </div>
    );
  }
}

NewTrip.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
  saveTrip: PropTypes.func,
  history: PropTypes.object,
  trips: PropTypes.array,
};

export default withStyles(styles, { withTheme: true })(NewTrip);
