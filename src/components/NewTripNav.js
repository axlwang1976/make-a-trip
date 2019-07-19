import React, { useState } from 'react';
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

function NewTripNav(props) {
  const [isModalShow, setIsModalShow] = useState(false);

  const showModal = () => setIsModalShow(true);

  const hideModal = () => setIsModalShow(false);

  const {
    classes,
    open,
    handleDrawerOpen,
    handleSave,
    trips,
    activities,
  } = props;

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
            onClick={showModal}
            className={styles.button}
            disabled={activities.length === 0}
          >
            Save
          </Button>
          {isModalShow && (
            <NewTripModal
              handleSave={handleSave}
              trips={trips}
              hideModal={hideModal}
            />
          )}
        </div>
      </AppBar>
    </div>
  );
}

NewTripNav.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  trips: PropTypes.array,
  handleDrawerOpen: PropTypes.func,
  handleSave: PropTypes.func,
  activities: PropTypes.array,
};

export default NewTripNav;
