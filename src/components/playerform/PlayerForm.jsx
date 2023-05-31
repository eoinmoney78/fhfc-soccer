import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

const PlayerForm = () => {
  const [playerData, setPlayerData] = useState({
    firstName: '',
    lastName: '',
    ageGroup: '',
    position: '',
    team: '',
    skillLevel: '',
    favoritePlayer: '',
    img: '',
  });

  const handleChange = (e) => {
    setPlayerData({ ...playerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(playerData);
    // Reset the form
    setPlayerData({
      firstName: '',
      lastName: '',
      ageGroup: '',
      position: '',
      team: '',
      skillLevel: '',
      favoritePlayer: '',
      img: '',
    });
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h4" align="center" mb={3}>
        Add Player Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name="firstName"
          value={playerData.firstName}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Last Name"
          name="lastName"
          value={playerData.lastName}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Age Group"
          name="ageGroup"
          value={playerData.ageGroup}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Position"
          name="position"
          value={playerData.position}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Team"
          name="team"
          value={playerData.team}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Skill Level"
          name="skillLevel"
          value={playerData.skillLevel}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Favorite Player"
          name="favoritePlayer"
          value={playerData.favoritePlayer}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Image URL"
          name="img"
          value={playerData.img}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Player
        </Button>
      </form>
    </Box>
  );
};

export default PlayerForm;
