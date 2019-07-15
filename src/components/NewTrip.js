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
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import arrayMove from 'array-move';
import NewTripNav from './NewTripNav';
import DraggableActivityList from './DraggableActivityList';
import { styles } from '../styles/NewTripStyles';
import formStyles from '../styles/NewTripForm.module.scss';
import actStyles from '../styles/Trip.module.scss';

class NewTrip extends Component {
  state = {
    open: true,
    // coverKeyword: '',
    time: '',
    description: '',
    actKeyword: '',
    activities: [],
    // trips: [],
  };

  handleDrawerOpen = () => this.setState({ open: true });

  handleDrawerClose = () => this.setState({ open: false });

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  // setTrips = () => {
  //   const { title, coverKeyword, days, trips } = this.state;
  //   const trip = {
  //     id: uuid(),
  //     title,
  //     coverImg: `https://source.unsplash.com/300x300/?${coverKeyword}`,
  //     days,
  //   };
  //   this.setState({ trips: [...trips, trip] });
  // };

  handleSubmit = e => {
    e.preventDefault();
    const { time, description, actKeyword, activities } = this.state;
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
      time: '',
      description: '',
      actKeyword: '',
    });
    // await this.setTrips();
  };

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
    const {
      open,
      // coverKeyword,
      time,
      description,
      actKeyword,
      activities,
      // trips,
    } = this.state;
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
          <ValidatorForm
            autoComplete="off"
            className={formStyles.Form}
            onSubmit={this.handleSubmit}
          >
            <Typography variant="h6">Add Your Activity</Typography>
            <TextValidator
              id="outlined-time"
              label="Activity Time"
              name="time"
              value={time}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <TextValidator
              id="outlined-description"
              label="Activity Description"
              name="description"
              value={description}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <TextValidator
              id="outlined-actKeyword"
              label="Activity Image Keyword"
              name="actKeyword"
              value={actKeyword}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <div className={formStyles.button}>
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
            </div>
          </ValidatorForm>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Paper className={actStyles.Day}>
            <div className={actStyles.DayActivityList}>
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
            </div>
          </Paper>
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
