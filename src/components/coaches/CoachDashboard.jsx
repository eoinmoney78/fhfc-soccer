import React, { useState, useEffect, useCallback } from 'react';
import { Container, Grid, Box, Typography, Card, CardContent, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { baseURL } from '../../environment';
import CoachDetails from '../coaches/CoachDetails'; // Update this component according to your requirements
import TemporaryDrawer from '../layout/TemporaryDrawer';
import { Image } from 'cloudinary-react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const CoachDashboard = ({ mode }) => {
  const [coachData, setCoachData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showHint, setShowHint] = useState(true);
  const [userId] = useState(localStorage.getItem('user_id'));
  const [search, setSearch] = useState('');
  const [filteredCoaches, setFilteredCoaches] = useState([]);

  const handleSearchChange = (event, value, reason) => {
    setSearch(value);
    if (reason === 'clear') {
      setShowHint(false);
    }
  
    const filtered = coachData.filter((coach) => 
      coach.name.toLowerCase().startsWith(value.toLowerCase())
    );
  
    const sorted = filtered.sort((a, b) => {
      if (a.name.toLowerCase().startsWith(value.toLowerCase())) {
        return -1;
      }
      if (b.name.toLowerCase().startsWith(value.toLowerCase())) {
        return 1;
      }
      return 0;
    });
  
    setFilteredCoaches(sorted);
  };
  

  const fetchCoachData = useCallback(async () => {
    const url = `${baseURL}/coach/getall/`; // Update the URL according to your API

    try {
      const response = await fetch(url, {
        headers: new Headers({
          'Authorization': `${localStorage.getItem('token')}`,
        }),
        method: "GET"
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch coach data');
      }

      const data = await response.json();
      console.log('Fetched coach data:', data);

      if (data && Array.isArray(data.coaches)) { // Update this according to your API response
        setCoachData(data.coaches);
      } else {
        console.error('Error fetching coach data: data.coaches is not an array');
      }
    } catch (error) {
      console.error('Error fetching coach data:', error.message);
    }
  }, []);

  useEffect(() => {
    fetchCoachData();
  }, [fetchCoachData]);

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

  const handleDeleteCoach = async (id) => {
    const url = `${baseURL}/coach/${id}`; // Update the URL according to your API

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
        throw new Error(data.message || 'Failed to delete coach');
      }

      const updatedCoachData = coachData.filter(coach => coach._id !== id);
      setCoachData(updatedCoachData);

      const updatedFilteredCoaches = filteredCoaches.filter(coach => coach._id !== id);
      setFilteredCoaches(updatedFilteredCoaches);

      alert('Coach deleted successfully!');
    } catch (error) {
      console.error('Error deleting coach:', error);
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.paper' }} style={{ minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <nav>
          <Typography variant="h4" component="h2" align="center" color="textSecondary" style={{ paddingTop: "20px", fontWeight: "lighter" }}>
            SLATE VALLEY UNITED F.C
            <br />
            COACHES
          </Typography>
          <TemporaryDrawer />
        </nav>

        <div>
          <br />
          <br />

          <Autocomplete
            freeSolo
            options={coachData.map((coach) => coach.lastName || '')}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search coaches"
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
              Click the 'x' in the search bar to display all coaches.
            </Typography>
          )}

          <br />
          <br />
          {filteredCoaches.length > 0 ? (
            <Grid container spacing={4}>
              {filteredCoaches.map((coach) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={coach._id}>
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
                      <CoachDetails coachData={coach} imageUrl={coach.imageUrl} /> 
                      <Image
                        cloudName="dns9ltiu8"
                        publicId={coach.img}
                        width="200"
                        crop="scale"
                        style={{ borderRadius: '50%' }}
                      />
                    </CardContent>
                    <CardActions>
                      {currentUser && canEditDelete(coach.userId) && (
                        <>
                          <Button onClick={() => handleDeleteCoach(coach._id)}>Delete</Button>
                          <Link to={`/edit-coach/${coach._id}`}>
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
              No coaches found.
            </Typography>
          )}
        </div>
      </Container>
    </Box>
  );
};

export default CoachDashboard;
