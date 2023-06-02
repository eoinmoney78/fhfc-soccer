import React, { useState, useEffect, useCallback } from 'react';
import { Container, Grid, Box, Typography, Card, CardContent, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { baseURL } from '../../environment';
import PlayerDetails from '../players/PlayerDetails';
import TemporaryDrawer from '../layout/TemporaryDrawer';
import { Image } from 'cloudinary-react';
import './Dashboard.css'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Dashboard = ({ mode }) => {
  const [playerData, setPlayerData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showHint, setShowHint] = useState(true);
  // const [mode] = useState('light');
  const [userId] = useState(localStorage.getItem('user_id'));
  const [search, setSearch] = useState('');
  const [filteredPlayers, setFilteredPlayers] = useState([]);

  const handleSearchChange = (event, value, reason) => {
    setSearch(value);
    if (reason === 'clear') {
      setShowHint(false);
    }

    const filtered = playerData.filter((player) => player.lastName.toLowerCase().startsWith(value.toLowerCase()));

    const sorted = filtered.sort((a, b) => {
      if (a.lastName.toLowerCase().startsWith(value.toLowerCase())) {
        return -1;
      }
      if (b.lastName.toLowerCase().startsWith(value.toLowerCase())) {
        return 1;
      }
      return 0;
    });

    setFilteredPlayers(sorted);
  };

  const fetchPlayerData = useCallback(async () => {
    const url = `${baseURL}/player/getall/`;

    try {
      const response = await fetch(url, {
        headers: new Headers({
          'Authorization': `${localStorage.getItem('token')}`,
        }),
        method: "GET"
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch player data');
      }

      const data = await response.json();
      console.log('Fetched player data:', data);

      if (data && Array.isArray(data.players)) {
        setPlayerData(data.players);
      } else {
        console.error('Error fetching player data: data.players is not an array');
      }
    } catch (error) {
      console.error('Error fetching player data:', error.message);
    }
  }, []);

  useEffect(() => {
    fetchPlayerData();
  }, [fetchPlayerData]);

  const fetchCurrentUser = useCallback(async () => {
    const url = `${baseURL}/user/me`;

    try {
      const response = await fetch(url, {
        headers: new Headers({
          'Authorization': `${localStorage.getItem('token')}`,
        }),
        method: "GET"
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch current user');
      }

      const data = await response.json();
      console.log('Fetched current user:', data);

      if (data && data.user) {
        setCurrentUser(data.user);
      } else {
        console.error('Error fetching current user: data.user is undefined');
      }
    } catch (error) {
      console.error('Error fetching current user:', error.message);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const canEditDelete = (creatorId) => {
    if (!currentUser) {
      return false;
    }
    return currentUser._id === creatorId || currentUser.isAdmin;
  };

  const handleDeletePlayer = async (id) => {
    const url = `${baseURL}/player/${id}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete player');
      }

      const updatedPlayerData = playerData.filter(player => player._id !== id);
      setPlayerData(updatedPlayerData);

      const updatedFilteredPlayers = filteredPlayers.filter(player => player._id !== id);
      setFilteredPlayers(updatedFilteredPlayers);

      alert('Player deleted successfully!');
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.paper' }} style={{ minHeight: "100vh" }}>

    {/* // <Box sx={{ bgcolor: mode === 'dark' ? '#000000' : '#E0E0E0' }} style={{ minHeight: "100vh" }}> */}



      <Container maxWidth="lg">
        <nav>
          <Typography variant="h4" component="h2" align="center" color="textSecondary" style={{ paddingTop: "20px", fontWeight: "lighter" }}>
            SLATE VALLEY UNITED
          </Typography>
          <TemporaryDrawer />
        </nav>

        <Typography variant="h2" component="h1" align="center" gutterBottom style={{ color: mode === "dark" ? "white" : "inherit" }}>
          Welcome, {currentUser ? currentUser.firstName + ' ' + currentUser.lastName : 'Guest'}!
        </Typography>

        <div>
          <br />
          <br />

          <Autocomplete
            freeSolo
            options={playerData.map((player) => player.lastName || '')}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search players"
                margin="normal"
                variant="outlined"
              />
            )}
            fullWidth
            value={search}
            onInputChange={(event, value, reason) => handleSearchChange(event, value, reason)}
          />

          {showHint && (
            <Typography variant="body1" align="center" style={{ marginBottom: "20px" }}>
              Click the 'x' in the search bar to display all players.
            </Typography>
          )}

          <br />
          <br />
          {filteredPlayers.length > 0 ? (
            <Grid container spacing={4}>
              {filteredPlayers.map((player) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={player._id}>
                  <Card
                    sx={{
                      marginBottom: 2,
                      transition: '0.3s',
                      boxShadow: '0 0 20px rgba(0,0,0,0.1)',
                      '&:hover': {
                        boxShadow: '0 0 20px rgba(0,0,0,0.9)',
                        transform: 'translateY(-6px)',
                      },
                    }}
                  >
                    <CardContent>
                      <PlayerDetails playerData={player} imageUrl={player.imageUrl} />
                      <Image
                        cloudName="dns9ltiu8"
                        publicId={player.img}
                        width="200"
                        crop="scale"
                        style={{ borderRadius: '50%' }}
                      />
                    </CardContent>
                    <CardActions>
                      {currentUser && canEditDelete(player.userId) && (
                        <>
                          <Button onClick={() => handleDeletePlayer(player._id)}>Delete</Button>
                          <Link to={`/edit-player/${player._id}`}>
                            <Button>Edit</Button>
                          </Link>
                        </>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" align="center">
              No players found.
            </Typography>
          )}
        </div>
      </Container>
    </Box>
  );
};

export default Dashboard;
