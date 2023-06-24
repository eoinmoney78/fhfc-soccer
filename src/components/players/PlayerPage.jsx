import React, { useEffect, useRef, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { baseURL } from '../../environment';
import TemporaryDrawer from '../layout/TemporaryDrawer';
import PlayerForm from './PlayerForm';

const PlayerPage = (params) => {
  const [formValues, setFormValues] = useState({});
  const dataFetchedRef = useRef(false);

  const { id } = useParams();

  const fetchPlayer = async () => {
    try {
      if (params.method === 'PUT') {
        const url = `${baseURL}/player/${id}`;
        console.log('Fetch Player URL:', url);
        const response = await fetch(url, {
          headers: new Headers({
            'Authorization': `${localStorage.getItem('token')}`,
          }),
          method: 'GET'
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch player');
        }

        console.log('Fetched Player:', data.player);
        setFormValues(data.player);
      }
    } catch (error) {
      console.error('Error fetching player:', error);
    }
  };

  const handleDeletePlayer = async () => {
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

      alert('Player deleted successfully!');
      // Redirect to the dashboard after successful deletion
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchPlayer();
  }, [id, params.method]);

  let method, url, initialValues, submitButtonText, errorMessage;

  if (params.method === 'POST') {
    method = 'POST';
    url = `${baseURL}/player`;
    initialValues = {
      firstName: '',
      lastName: '',
      ageGroup: '',
      position: '',
      team: '',
      skillLevel: '',
      favoritePlayer: '',
      img: '',
    };
    submitButtonText = 'Add Player';
    errorMessage = 'Error adding player:';
  } else if (params.method === 'PUT') {
    method = 'PUT';
    url = `${baseURL}/player/${id}`;
    initialValues = formValues;
    submitButtonText = 'Update Player';
    errorMessage = 'Error updating player:';
  }

  // console.log('Method:', method);
  // console.log('URL:', url);
  // console.log('Initial Values:', initialValues);
  // console.log('Submit Button Text:', submitButtonText);
  // console.log('Error Message:', errorMessage);


  
  return (
    <Container maxWidth="xs">
      <TemporaryDrawer />
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        {params.title}
      </Typography>
      <PlayerForm
        method={method}
        url={url}
        initialValues={initialValues}
        submitButtonText={submitButtonText}
        errorMessage={errorMessage}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1rem' }}>
        <Link to="/dashboard">
          <Button variant="contained" color="primary">
            Return to Dashboard
          </Button>
        </Link>
        {params.method === 'PUT' && (
          <Button variant="contained" color="secondary" onClick={handleDeletePlayer} style={{ marginLeft: '1rem' }}>
            Delete Player
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default PlayerPage;
