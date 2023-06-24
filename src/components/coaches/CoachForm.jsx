import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Grid, Typography } from '@mui/material';
import { baseURL } from '../../environment';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';

function CoachForm(props) {
  const [coaches, setCoaches] = useState([]);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [img, setImg] = useState('');
  const [imagePublicId, setImagePublicId] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchCoaches();
  }, []);

  useEffect(() => {
    console.log('isAdmin:', isAdmin);
  }, [isAdmin]);

  const fetchCoaches = async () => {
    try {
      const response = await fetch(`${baseURL}/coach/getall`, {
        method: 'GET',
        headers: new Headers({
          'Authorization': `${localStorage.getItem('token')}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`);
      }

      const data = await response.json();
      setCoaches(data.coaches);

      if (localStorage.getItem('token')) {
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
        console.log('Coaches:', data.coaches);
        console.log('User:', user);
      }

      console.log('Coaches:', data.coaches);
    } catch (error) {
      console.error('Error fetching coaches:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isAdmin) {
      try {
        let uploadedUrl = '';
        if (imageFile) {
          uploadedUrl = await handleImageUpload();
        }

        const coachData = {
          name,
          about,
          img: uploadedUrl,
          imagePublicId,
        };

        const response = await fetch(`${baseURL}/coach`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(coachData),
        });

        if (!response.ok) {
          throw new Error(`Failed to create coach, status = ${response.status}`);
        }

        setName('');
        setAbout('');
        setImg('');
        setImagePublicId('');
        setImageFile(null);
        fetchCoaches();
      } catch (error) {
        console.error('Error creating coach:', error);
      }
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      console.log('No image file selected');
      return '';
    }

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'ml_default');

    const response = await fetch('https://api.cloudinary.com/v1_1/dns9ltiu8/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.secure_url) {
      console.log('Image uploaded successfully to Cloudinary');
      return data.secure_url;
    } else {
      console.error('Cloudinary error:', data);
      return '';
    }
  };

  return (
    <Container maxWidth="md">
      {isAdmin && (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} direction="column">
            <Grid item xs={12} lg={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                label="About"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="contained-button-file"
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" component="span">
                  Upload Image
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Coach

              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    {coaches.map((coach) => (
  <div key={coach._id}>
    <Typography variant="h4" gutterBottom>
      {coach.name}
    </Typography>
    {coach.img && (
      <CloudinaryContext cloudName="dns9ltiu8">
        <Image publicId={props.initialValues.img} width="300" crop="scale">
          <Transformation quality="auto" fetchFormat="auto" />
        </Image>
      </CloudinaryContext>
    )}
  </div>
))}
    </Container>
  );
}

export default CoachForm;

