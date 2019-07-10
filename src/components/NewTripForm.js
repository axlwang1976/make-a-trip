import React, { Component } from 'react';
import uuid from 'uuid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import styles from '../styles/NewTripForm.module.scss';

export default class NewTripForm extends Component {
  state = {
    title: '',
    coverKeyword: '',
    day: '',
    time: '',
    description: '',
    actKeyword: '',
    detail: [],
    days: [],
    trips: [],
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  setDetail = () => {
    const { time, description, actKeyword, detail } = this.state;
    this.setState({
      detail: [
        ...detail,
        {
          time,
          description,
          imgSrc: `https://source.unsplash.com/300x300/?${actKeyword}`,
        },
      ],
    });
  };

  setDays = () => {
    const { day, detail, days } = this.state;
    this.setState({ days: [...days, { day, detail }] });
  };

  setTrips = () => {
    const { title, coverKeyword, days, trips } = this.state;
    const trip = {
      id: uuid(),
      title,
      coverImg: `https://source.unsplash.com/300x300/?${coverKeyword}`,
      days,
    };
    this.setState({ trips: [...trips, trip] });
  };

  handleSubmit = async e => {
    e.preventDefault();
    await this.setDetail();
    await this.setDays();
    await this.setTrips();
  };

  render() {
    const {
      title,
      coverKeyword,
      day,
      time,
      description,
      actKeyword,
    } = this.state;
    return (
      <form
        autoComplete="off"
        className={styles.Form}
        onSubmit={this.handleSubmit}
      >
        <Typography variant="h6">Add Your Activity</Typography>
        <TextField
          id="outlined-title"
          label="Trip Title"
          name="title"
          value={title}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-cover"
          label="Cover Image Keyword"
          name="coverKeyword"
          value={coverKeyword}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-day"
          label="Day of trip"
          name="day"
          value={day}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          type="number"
        />
        <FormControl variant="outlined" className={styles.time}>
          <InputLabel htmlFor="outlined-time-simple">Time</InputLabel>
          <Select
            value={time}
            onChange={this.handleChange}
            input={<OutlinedInput name="time" id="outlined-time-simple" />}
          >
            <MenuItem value="Morning">Morning</MenuItem>
            <MenuItem value="Afternoon">Afternoon</MenuItem>
            <MenuItem value="Night">Night</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outlined-description"
          label="Activity Description"
          name="description"
          value={description}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-actKeyword"
          label="Activity Image Keyword"
          name="actKeyword"
          value={actKeyword}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <div className={styles.button}>
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </div>
      </form>
    );
  }
}
