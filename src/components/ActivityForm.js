import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import useInput from '../hooks/useInput';
import formStyles from '../styles/NewTripForm.module.scss';

function ActivityForm(props) {
  const [time, updateTime, resetTime] = useInput('');
  const [description, updateDescription, resetDescription] = useInput('');
  const [actKeyword, updateActKeyword, resetActKeyword] = useInput('');

  const handleSubmit = e => {
    e.preventDefault();
    const { addActivity } = props;
    addActivity(time, description, actKeyword);
    resetTime();
    resetDescription();
    resetActKeyword();
  };

  return (
    <ValidatorForm
      autoComplete="off"
      className={formStyles.Form}
      onSubmit={handleSubmit}
    >
      <Typography variant="h6">Add Your Activity</Typography>
      <TextValidator
        id="outlined-time"
        label="Activity Time"
        name="time"
        value={time}
        onChange={updateTime}
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
        onChange={updateDescription}
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
        onChange={updateActKeyword}
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
  );
}

ActivityForm.propTypes = {
  addActivity: PropTypes.func,
};

export default ActivityForm;
