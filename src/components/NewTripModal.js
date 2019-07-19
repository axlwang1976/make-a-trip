import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import useInput from '../hooks/useInput';

export default function NewTripModal(props) {
  const open = true;

  const [curTitle, updateCurTitle] = useInput('');

  useEffect(() => {
    const { trips } = props;
    ValidatorForm.addValidationRule('isTitleUnique', value =>
      trips.every(({ title }) => title.toLowerCase() !== value.toLowerCase())
    );
  }, [curTitle, props]);

  const { handleSave, hideModal } = props;

  return (
    <Dialog open={open} onClose={hideModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">New Trip Name</DialogTitle>
      <ValidatorForm autoComplete="off" onSubmit={() => handleSave(curTitle)}>
        <DialogContent>
          <DialogContentText>
            Enter your new trip name. Make sure it's unique.
          </DialogContentText>
          <TextValidator
            id="outlined-title"
            label="Trip Title"
            name="title"
            value={curTitle}
            onChange={updateCurTitle}
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

NewTripModal.propTypes = {
  handleSave: PropTypes.func,
  hideModal: PropTypes.func,
};
