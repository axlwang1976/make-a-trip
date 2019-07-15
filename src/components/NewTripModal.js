import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';

export default class NewTripModal extends Component {
  static defaultProps = { open: true };

  state = { title: '' };

  componentDidMount() {
    const { trips } = this.props;
    ValidatorForm.addValidationRule('isTitleUnique', value =>
      trips.every(({ title }) => title.toLowerCase() !== value.toLowerCase())
    );
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { title } = this.state;
    const { open, handleSave, hideModal } = this.props;
    return (
      <Dialog
        open={open}
        onClose={hideModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Trip Name</DialogTitle>
        <ValidatorForm autoComplete="off" onSubmit={() => handleSave(title)}>
          <DialogContent>
            <DialogContentText>
              Enter your new trip name. Make sure it's unique.
            </DialogContentText>
            <TextValidator
              id="outlined-title"
              label="Trip Title"
              name="title"
              value={title}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              fullWidth
              validators={['required', 'isTitleUnique']}
              errorMessages={['this field is required', 'Title already used']}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideModal} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="secondary" type="submit">
              Save
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
}

NewTripModal.propTypes = {
  trips: PropTypes.array,
  handleSave: PropTypes.func,
  hideModal: PropTypes.func,
  open: PropTypes.bool,
};
