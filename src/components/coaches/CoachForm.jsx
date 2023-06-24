




import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import { Link } from 'react-router-dom';


function CoachForm({ initialValues = {}, ...props }) {
  const isAuthenticated = !!localStorage.getItem('token');
  const [imageFile, setImageFile] = useState(null);
  const [cloudinaryUrl, setCloudinaryUrl] = useState('');

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  const setValues = () => {
    if (initialValues) {
      setName(initialValues.name);
      setAbout(initialValues.about);
    }
  };

  useEffect(() => {
    if (Object.values(initialValues).length !== 0) {
      setValues();
    }
  }, [initialValues]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let uploadedUrl = '';
      if (imageFile) {
        uploadedUrl = await handleImageUpload();
      }

      await submitForm(uploadedUrl);
    } catch (error) {
      console.error('Error uploading image or submitting form:', error);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      console.log('No image file selected');
      return Promise.resolve('');
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
      setCloudinaryUrl(data.secure_url);
      return Promise.resolve(data.secure_url);
    } else {
      console.error('Cloudinary error:', data);
      return Promise.reject(data);
    }
  };

  const submitForm = async (uploadedUrl) => {
    const coachData = {
      name,
      about,
      img: uploadedUrl || cloudinaryUrl,
    };

    try {
      const response = await fetch(props.url, {
        method: props.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(coachData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/coaches');
      } else {
        console.error('Error sending coach data to server');
      }
    } catch (error) {
      console.error('Error sending coach data to server:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        {props.title}
      </Typography>
      {!isAuthenticated && (
        <Typography variant="body1" color="error" gutterBottom>
          You must be logged in to enter information.
        </Typography>
      )}
      <Grid container spacing={2}>
      <Grid item xs={12}>
  <TextField
    label="Name"
    value={name}
    required
    onChange={(e) => setName(e.target.value)}
    fullWidth
    disabled={!isAuthenticated}
  />
</Grid>
<Grid item xs={12}>
  <TextField
    label="About"
    value={about}
    required
    onChange={(e) => setAbout(e.target.value)}
    fullWidth
    disabled={!isAuthenticated}
  />
</Grid>
<Grid item xs={12}>
  <input
    accept="image/*"
    style={{ display: 'none' }}
    id="contained-button-file"
    type="file"
    onChange={(e) => setImageFile(e.target.files[0])}
    disabled={!isAuthenticated}
  />
  <label htmlFor="contained-button-file">
    <Button variant="contained" component="span">
      Upload Image
    </Button>
  </label>
  {initialValues.img && (
    <CloudinaryContext cloudName="dns9ltiu8">
      <Image publicId={initialValues.img} width="300" crop="scale">
        <Transformation quality="auto" fetchFormat="auto" />
      </Image>
    </CloudinaryContext>
  )}
</Grid>
<Grid item xs={12}>
  <Box display="flex" justifyContent="flex-end">
    <Button type="submit" variant="contained" color="primary">
      {props.submitButtonText}
    </Button>
  </Box>
</Grid>
{props.addCoachButton && (
  <Grid item xs={12}>
    <Box display="flex" justifyContent="flex-start" marginTop={2}>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/coaches"
      >
        Add Coach
      </Button>
    </Box>
  </Grid>
)}
</Grid>
</form>
);
}

export default CoachForm;
