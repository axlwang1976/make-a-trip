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
import NewTripModal from './NewTripModal.js';
import styles from '../styles/NewTripNav.module.scss';

class NewTripNav extends Component {
  state = { isModalShow: false };

  showModal = () => this.setState({ isModalShow: true });

  hideModal = () => this.setState({ isModalShow: false });

  render() {
    const { classes, open, handleDrawerOpen, handleSave, trips } = this.props;
    const { isModalShow } = this.state;
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
            <Button variant="contained" className={styles.button}>
              <Link to="/">Back</Link>
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.showModal}
              className={styles.button}
            >
              Save
            </Button>
            {isModalShow && (
              <NewTripModal
                handleSave={handleSave}
                trips={trips}
                hideModal={this.hideModal}
              />
            )}
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
