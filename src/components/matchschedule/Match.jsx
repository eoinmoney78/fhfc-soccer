import React, { useState, useEffect } from 'react';
import { baseURL } from '../../environment';
import MatchForm from './MatchForm'; 
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function Match() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');
  const [editingMatch, setEditingMatch] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Replace with your admin authentication logic

  const fetchMatches = async () => {
    try {
      const response = await fetch(`${baseURL}/match/getall`, {
        headers: {
          'Authorization': `${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch match schedule, status = ${response.status}`);
      }
      const data = await response.json();
      setMatches(data.matches);
    } catch (error) {
      setError('Error fetching match schedule: ' + error.message);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [isAdmin]);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const adminResponse = await fetch(`${baseURL}/user/me`, {
          method: 'GET',
          headers: new Headers({
            'Authorization': `${localStorage.getItem('token')}`,
          }),
        });
  
        if (!adminResponse.ok) {
          throw new Error(`Failed to fetch admin status, status = ${adminResponse.status}`);
        }
  
        const { user } = await adminResponse.json();
        setIsAdmin(user.isAdmin);
      } catch (error) {
        // Handle the 403 Forbidden error by assuming the user is not an admin
        setIsAdmin(false);
        console.error('Failed to fetch admin status:', error.message);
      }
    }
  
    fetchAdminStatus();
  }, []);
  

  const handleEdit = async (matchId) => {
    if (!isAdmin) {
      console.log('Only admin can edit matches.');
      return;
    }
  
    try {
      const response = await fetch(`${baseURL}/match/${matchId}`, {
        headers: {
          'Authorization': `${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch match details, status = ${response.status}`);
      }
  
      const data = await response.json();
      const matchDetails = data.match;
  
      setEditingMatch(matchDetails); // Set the currently editing match
  
      // Perform the edit logic using the match details
      // Example: Open a modal or navigate to an edit page with the match details
      console.log('Edit match with ID:', matchId);
      console.log('Match details:', matchDetails);
    } catch (error) {
      console.error('Error fetching match details:', error.message);
    }
  };
  
  
  const handleDelete = async (matchId) => {
    if (!isAdmin) {
      console.log('Only admin can delete matches.');
      return;
    }
  
    try {
      const response = await fetch(`${baseURL}/match/${matchId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete match, status = ${response.status}`);
      }
  
      // Perform any additional cleanup or update logic
      console.log('Match with ID', matchId, 'deleted successfully');
      // Call fetchMatches to update the match list
      fetchMatches();
    } catch (error) {
      console.error('Error deleting match:', error.message);
    }
  };
  
  return (
    <Container>
      <Typography variant="h2" gutterBottom>Match Schedule</Typography>

      <Grid container spacing={3}>
        {matches.map((match) => (
          <Grid item xs={12} md={6} lg={4} key={match._id}>
            <Card sx={{ backgroundColor: 'lightblue' }}>
              <CardContent>
                <Typography variant="body1">
                  Date: {new Date(match.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </Typography>
                <Typography variant="body1">
                  Time: {match.time}
                </Typography>
                <Typography variant="body1">Teams: {match.team1} vs {match.team2}</Typography>
                <Typography variant="body1">Location: {match.location}</Typography>
                <Typography variant="body1">Age Group: {match.ageGroup}</Typography>

                {isAdmin && (
                  <Box mt={2}>
                    <Button onClick={() => handleEdit(match._id)} variant="contained" color="primary">Edit</Button>
                    <Button onClick={() => handleDelete(match._id)} variant="contained" color="error" sx={{ marginLeft: '8px' }}>Delete
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {isAdmin && (
        <Box my={4}>
          <Typography variant="h3" gutterBottom>{editingMatch ? 'Edit Game' : 'Add a New Game'}</Typography>
          <Box mt={4}>
            <MatchForm onNewMatch={fetchMatches} initialMatch={editingMatch || {}} />
          </Box>
        </Box>
      )}
      {!isAdmin && (
        <Box my={4}>
          <Typography variant="h3" gutterBottom>Add a New Game</Typography>
          <Typography variant="body1">Only admin can add and edit games.</Typography>
        </Box>
      )}
    </Container>
  );
}

export default Match;

