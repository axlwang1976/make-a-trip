import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Activity from './Activity';
import { styles } from '../styles/NewTripStyles';
import formStyles from '../styles/NewTripForm.module.scss';
import actStyles from '../styles/Trip.module.scss';

class NewTrip extends Component {
  state = {
    open: true,
    title: '',
    // coverKeyword: '',
    time: '',
    description: '',
    actKeyword: '',
    activities: [],
    // trips: [],
  };

  componentDidMount() {
    const { trips } = this.props;
    ValidatorForm.addValidationRule('isTitleUnique', value =>
      trips.every(({ title }) => title.toLowerCase() !== value.toLowerCase())
    );
  }

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

  handleSave = () => {
    const { saveTrip, history } = this.props;
    const { activities, title } = this.state;
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

  render() {
    const { classes, theme } = this.props;
    const {
      open,
      title,
      // coverKeyword,
      time,
      description,
      actKeyword,
      activities,
      // trips,
    } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Create New Trip
            </Typography>
            <ValidatorForm autoComplete="off" onSubmit={this.handleSave}>
              <TextValidator
                id="outlined-title"
                label="Trip Title"
                name="title"
                value={title}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                validators={['required', 'isTitleUnique']}
                errorMessages={['this field is required', 'Title already used']}
              />
              <Button variant="contained" color="secondary" type="submit">
                Save
              </Button>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
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
                activities.map((activity, i) => (
                  <Activity {...activity} key={i} />
                ))
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

export default withStyles(styles, { withTheme: true })(NewTrip);

NewTrip.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
  saveTrip: PropTypes.func,
  history: PropTypes.object,
  trips: PropTypes.array,
};
