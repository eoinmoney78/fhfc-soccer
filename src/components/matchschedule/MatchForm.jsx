
import React, { useState, useEffect } from 'react';
import { baseURL } from '../../environment';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(2, 0),
}));

const MatchForm = ({ onNewMatch, initialMatch }) => {
  const [newMatch, setNewMatch] = useState({
    date: initialMatch.date || '',
    time: initialMatch.time || '',
    team1: initialMatch.team1 || '',
    team2: initialMatch.team2 || '',
    location: initialMatch.location || '',
    ageGroup: initialMatch.ageGroup || '',
  });

  useEffect(() => {
    setNewMatch(initialMatch);
  }, [initialMatch]);

  const handleInputChange = (e) => {
    if (e.target.name === 'date' || e.target.name === 'time') {
      const value = e.target.value;
      setNewMatch((prevState) => ({
        ...prevState,
        [e.target.name]: value,
      }));
    } else {
      setNewMatch((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/match`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newMatch),
      });

      if (!response.ok) {
        throw new Error(`Failed to create match, status = ${response.status}`);
      }

      const data = await response.json();
      setNewMatch({
        date: '',
        time: '',
        team1: '',
        team2: '',
        location: '',
        ageGroup: '',
      });
      onNewMatch();
    } catch (error) {
      console.error('Error creating match: ' + error.message);
    }
  };

  return (
    <StyledBox component="form" onSubmit={handleSubmit} autoComplete="off">
        <TextField
        label="Date"
        type="date"
        name="date"
        value={newMatch.date}
        onChange={handleInputChange}
        required
        fullWidth
        InputLabelProps={{
          shrink: true,
          style: { position: 'static' },
        }}
        sx={{ marginBottom: '1rem' }}
      />
      <TextField
        label="Time"
        type="time"
        name="time"
        value={newMatch.time}
        onChange={handleInputChange}
        required
        fullWidth
        InputLabelProps={{
          shrink: true,
          style: { position: 'static' },
        }}
        sx={{ marginBottom: '1rem' }}
      />
      <TextField
        label="Team 1"
        type="text"
        name="team1"
        value={newMatch.team1}
        onChange={handleInputChange}
        required
        fullWidth
      />
      <TextField
        label="Team 2"
        type="text"
        name="team2"
        value={newMatch.team2}
        onChange={handleInputChange}
        required
        fullWidth
      />
      <TextField
        label="Location"
        type="text"
        name="location"
        value={newMatch.location}
        onChange={handleInputChange}
        required
        fullWidth
      />
      <TextField
        label="Age Group"
        type="text"
        name="ageGroup"
        value={newMatch.ageGroup}
        onChange={handleInputChange}
        required
        fullWidth
      />
      <Button variant="contained" color="primary" type="submit" style={{ marginTop: '1rem' }}>
        Add Game
      </Button>
    </StyledBox>
  );
};

export default MatchForm;
