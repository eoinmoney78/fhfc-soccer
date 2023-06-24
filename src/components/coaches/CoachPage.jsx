import React, { useEffect, useRef, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { baseURL } from '../../environment';
import TemporaryDrawer from '../layout/TemporaryDrawer';
import CoachForm from './CoachForm';

const CoachPage = (params) => {
  const [formValues, setFormValues] = useState({});
  const dataFetchedRef = useRef(false);

  const { id } = useParams();

  const fetchCoach = async () => {
    try {
      if (params.method === 'PUT') {
        const url = `${baseURL}/coach/${id}`;
        console.log('Fetch Coach URL:', url);
        const response = await fetch(url, {
          headers: new Headers({
            'Authorization': `${localStorage.getItem('token')}`,
          }),
          method: 'GET',
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch coach');
        }

        console.log('Fetched Coach:', data.coach);
        setFormValues(data.coach);
      }
    } catch (error) {
      console.error('Error fetching coach:', error);
    }
  };

  const handleDeletePlayer = async () => {
    const url = `${baseURL}/coach/${id}`;

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

      alert('Coach deleted successfully!');
      // Redirect to the dashboard after successful deletion
      window.location.href = '/coach-dashboard';
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchCoach();
  }, [id, params.method]);

  let method, url, initialValues, submitButtonText, errorMessage;

  if (params.method === 'POST') {
    method = 'POST';
    url = `${baseURL}/coach`;
    initialValues = {
      name: '',
      about: '',
      img: '',
    };
    submitButtonText = 'Add Coach';
    errorMessage = 'Error adding coach:';
  } else if (params.method === 'PUT') {
    method = 'PUT';
    url = `${baseURL}/coach/${id}`;
    initialValues = formValues;
    submitButtonText = 'Update Coach';
    errorMessage = 'Error updating coach:';
  }

  console.log('Method:', method);
  console.log('URL:', url);
  console.log('Initial Values:', initialValues);
  console.log('Submit Button Text:', submitButtonText);
  console.log('Error Message:', errorMessage);

  return (
    <Container maxWidth="sm">
      {/* Change from xs to sm, md, lg, or xl */}
      <TemporaryDrawer />
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        {/* Change variant for size */}
        {params.title}
      </Typography>
      <CoachForm
        method={method}
        url={url}
        initialValues={initialValues}
        submitButtonText={submitButtonText}
        errorMessage={errorMessage}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1rem' }}>
        <Link to="/coach-dashboard">
          <Button variant="contained" color="primary">
            Return to coach-dashboard
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default CoachPage;
