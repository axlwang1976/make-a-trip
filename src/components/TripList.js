import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MiniTrip from './MiniTrip';
import styles from '../styles/TripList.module.scss';
import '../styles/fade.css';

export default function TripList({ trips, history, deleteTrip }) {
  const goToTrip = id => history.push(`/trip/${id}`);

  const [open, setOpen] = useState(false);

  const [deletingId, setDeletingId] = useState('');

  const openModal = id => {
    setOpen(true);
    setDeletingId(id);
  };

  const closeModal = () => setOpen(false);

  const handleDelete = () => {
    deleteTrip(deletingId);
    setOpen(false);
  };

  return (
    <div className={styles.TripList}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Typography variant="h2">MAKE-A-TRIP</Typography>
          <Button variant="contained">
            <Link to="/trip/new">Create Trip</Link>
          </Button>
        </nav>
        <TransitionGroup className={styles.trips}>
          {trips.map(trip => (
            <CSSTransition key={trip.id} classNames="fade" timeout={500}>
              <MiniTrip {...trip} goToTrip={goToTrip} openModal={openModal} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <Dialog
        open={open}
        aria-labelledby="delete-dialog-title"
        onClose={closeModal}
      >
        <DialogTitle id="delete-dialog-title">Delete This Trip?</DialogTitle>
        <List>
          <ListItem button onClick={handleDelete}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete" />
          </ListItem>
          <ListItem button onClick={closeModal}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cancel" />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}

TripList.propTypes = {
  trips: PropTypes.array,
  history: PropTypes.object,
  deleteTrip: PropTypes.func,
};
