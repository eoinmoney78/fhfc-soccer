import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';

function PlayerForm(props) {
  const isAuthenticated = !!localStorage.getItem('token');
  const [imageFile, setImageFile] = useState(null);
  const [cloudinaryUrl, setCloudinaryUrl] = useState('');

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [team, setTeam] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [favoritePlayer, setFavoritePlayer] = useState('');

  const setValues = () => {
    setFirstName(props.initialValues.firstName);
    setLastName(props.initialValues.lastName);
    setPosition(props.initialValues.position);
    setAgeGroup(props.initialValues.ageGroup);
    setTeam(props.initialValues.team);
    setSkillLevel(props.initialValues.skillLevel);
    setFavoritePlayer(props.initialValues.favoritePlayer);
  };

  useEffect(() => {
    if (Object.values(props.initialValues).length === 0) {
      return;
    } else {
      setValues();
    }
  }, [props.initialValues]);

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
    const playerData = {
      firstName,
      lastName,
      position,
      ageGroup,
      team,
      skillLevel,
      favoritePlayer,
      img: uploadedUrl || cloudinaryUrl,
    };
    console.log('playerinfo:', playerData);
    console.log('Sending image to Cloudinary...');
    console.log("cloudinaryUrl:", cloudinaryUrl);
  

    try {
      console.log('Sending player data to server...');
      const response = await fetch(props.url, {
        method: props.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(playerData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Player data sent successfully to server');
        navigate('/dashboard');
      } else {
        console.error('Error sending player data to server');
      }
    } catch (error) {
      console.error('Error sending player data to server:', error);
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
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            disabled={!isAuthenticated}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            disabled={!isAuthenticated}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Position"
            value={position}
            required
            onChange={(e) => setPosition(e.target.value)}
            fullWidth
            disabled={!isAuthenticated}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Age Group"
            value={ageGroup}
            required
            onChange={(e) => setAgeGroup(e.target.value)}
            fullWidth
            disabled={!isAuthenticated}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Team"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            fullWidth
            disabled={!isAuthenticated}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Skill Level"
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Favorite Player"
            value={favoritePlayer}
            onChange={(e) => setFavoritePlayer(e.target.value)}
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
          {props.initialValues.img && (
            <CloudinaryContext cloudName="dns9ltiu8">
              <Image publicId={props.initialValues.img} width="300" crop="scale">
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
      </Grid>
    </form>
  );
}

export default PlayerForm;
