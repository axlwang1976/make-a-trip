import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import formStyles from '../styles/NewTripForm.module.scss';

class ActivityForm extends Component {
  state = {
    time: '',
    description: '',
    actKeyword: '',
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    const { time, description, actKeyword } = this.state;
    const { addActivity } = this.props;
    addActivity(time, description, actKeyword);
  };

  render() {
    const { time, description, actKeyword } = this.state;
    return (
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
    );
  }
}

ActivityForm.propTypes = {
  addActivity: PropTypes.func,
};

export default ActivityForm;
