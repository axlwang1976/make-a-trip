import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import styles from '../styles/NewTripNav.module.scss';

class NewTripNav extends Component {
  state = { title: '' };

  componentDidMount() {
    const { trips } = this.props;
    ValidatorForm.addValidationRule('isTitleUnique', value =>
      trips.every(({ title }) => title.toLowerCase() !== value.toLowerCase())
    );
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { classes, open, handleDrawerOpen, handleSave } = this.props;
    const { title } = this.state;
    return (
      <div className={styles.root}>
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
              onClick={() => handleDrawerOpen()}
              edge="start"
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Create New Trip
            </Typography>
          </Toolbar>
          <div className={styles.navBtns}>
            <ValidatorForm
              autoComplete="off"
              onSubmit={() => handleSave(title)}
            >
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
            <Button variant="contained">
              <Link to="/">Back</Link>
            </Button>
          </div>
        </AppBar>
      </div>
    );
  }
}

NewTripNav.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  trips: PropTypes.array,
  handleDrawerOpen: PropTypes.func,
  handleSave: PropTypes.func,
};

export default NewTripNav;
