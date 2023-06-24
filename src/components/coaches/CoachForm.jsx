import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Grid, Typography } from '@mui/material';
import { baseURL } from '../../environment';

function CoachForm() {
  const [coaches, setCoaches] = useState([]);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [img, setImg] = useState('');
  const [imagePublicId, setImagePublicId] = useState('');
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
    } catch (error) {
      console.error('Error fetching coaches:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isAdmin) {
      const coachData = {
        name,
        about,
        img,
        imagePublicId,
      };

      try {
        const response = await fetch(`${baseURL}/coaches`, {
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
        fetchCoaches();
      } catch (error) {
        console.error('Error creating coach:', error);
      }
    }
  };

  const handleEditCoach = async (coachId, newName, newAbout, newImg, newImagePublicId) => {
    const updatedData = {
      name: newName,
      about: newAbout,
      img: newImg,
      imagePublicId: newImagePublicId
    };

    try {
      const response = await fetch(`${baseURL}/coach/${coachId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update coach, status = ${response.status}`);
      }

      fetchCoaches();
    } catch (error) {
      console.error('Error updating coach:', error);
    }
  };

  const handleDeleteCoach = async (coachId) => {
    try {
      const response = await fetch(`${baseURL}/coach/${coachId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete coach, status = ${response.status}`);
      }

      fetchCoaches();
    } catch (error) {
      console.error('Error deleting coach:', error);
    }
  };

  return (
    <Container>
      {isAdmin && (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item>
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
            <Grid item>
              <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                value={img}
                onChange={(e) => setImg(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Image Public ID"
                variant="outlined"
                fullWidth
                value={imagePublicId}
                onChange={(e) => setImagePublicId(e.target.value)}
              />
            </Grid>
            <Grid item>
              {isAdmin && (
                <Button type="submit" variant="contained" color="primary">
                  Add Coach
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      )}
      {coaches.map((coach) => (
        <div key={coach._id}>
          <Typography variant="h4" gutterBottom>
            {coach.name}
          </Typography>
          <Typography variant="body1">{coach.about}</Typography>
          <img src={coach.img} alt={coach.name} />
          {isAdmin && (
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleEditCoach(
                    coach._id,
                    coach.name,
                    coach.about,
                    coach.img,
                    coach.imagePublicId
                  )
                }
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteCoach(coach._id)}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      ))}
    </Container>
  );
}

export default CoachForm;







// import React, { useEffect, useState } from 'react';
// import { TextField, Button, Grid, Typography, Box } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
// import { Link } from 'react-router-dom';


// function CoachForm({ initialValues = {}, ...props }) {

//   const isAuthenticated = !!localStorage.getItem('token');
//   // assume 'role' is stored in localStorage when the user logs in
//   const isAdmin = localStorage.getItem('role') === 'admin';
//   const [imageFile, setImageFile] = useState(null);
//   const [cloudinaryUrl, setCloudinaryUrl] = useState('');

//   const navigate = useNavigate();

//   const [name, setName] = useState('');
//   const [about, setAbout] = useState('');

//   const setValues = () => {
//     if (initialValues) {
//       setName(initialValues.name);
//       setAbout(initialValues.about);
//     }
//   };

//   useEffect(() => {
//     if (Object.values(initialValues).length !== 0) {
//       setValues();
//     }
//   }, [initialValues]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       let uploadedUrl = '';
//       if (imageFile) {
//         uploadedUrl = await handleImageUpload();
//       }

//       await submitForm(uploadedUrl);
//     } catch (error) {
//       console.error('Error uploading image or submitting form:', error);
//     }
//   };

//   const handleImageUpload = async () => {
//     if (!imageFile) {
//       console.log('No image file selected');
//       return Promise.resolve('');
//     }

//     const formData = new FormData();
//     formData.append('file', imageFile);
//     formData.append('upload_preset', 'ml_default');

//     const response = await fetch('https://api.cloudinary.com/v1_1/dns9ltiu8/image/upload', {
//       method: 'POST',
//       body: formData,
//     });

//     const data = await response.json();

//     if (data.secure_url) {
//       console.log('Image uploaded successfully to Cloudinary');
//       setCloudinaryUrl(data.secure_url);
//       return Promise.resolve(data.secure_url);
//     } else {
//       console.error('Cloudinary error:', data);
//       return Promise.reject(data);
//     }
//   };

//   const submitForm = async (uploadedUrl) => {
//     const coachData = {
//       name,
//       about,
//       img: uploadedUrl || cloudinaryUrl,
//     };

//     try {
//       const response = await fetch(props.url, {
//         method: props.method,
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify(coachData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         navigate('/coaches');
//       } else {
//         console.error('Error sending coach data to server');
//       }
//     } catch (error) {
//       console.error('Error sending coach data to server:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Typography variant="h6" gutterBottom>
//         {props.title}
//       </Typography>
//       {!isAuthenticated && (
//         <Typography variant="body1" color="error" gutterBottom>
//           You must be logged in to enter information.
//         </Typography>
//       )}
//       <Grid container spacing={2}>
//       <Grid item xs={12}>
//   <TextField
//     label="Name"
//     value={name}
//     required
//     onChange={(e) => setName(e.target.value)}
//     fullWidth
//     disabled={!isAuthenticated}
//   />
// </Grid>
// <Grid item xs={12}>
//   <TextField
//     label="About"
//     value={about}
//     required
//     onChange={(e) => setAbout(e.target.value)}
//     fullWidth
//     disabled={!isAuthenticated}
//   />
// </Grid>
// <Grid item xs={12}>
//   <input
//     accept="image/*"
//     style={{ display: 'none' }}
//     id="contained-button-file"
//     type="file"
//     onChange={(e) => setImageFile(e.target.files[0])}
//     disabled={!isAuthenticated}
//   />
//   <label htmlFor="contained-button-file">
//     <Button variant="contained" component="span">
//       Upload Image
//     </Button>
//   </label>
//   {initialValues.img && (
//     <CloudinaryContext cloudName="dns9ltiu8">
//       <Image publicId={initialValues.img} width="300" crop="scale">
//         <Transformation quality="auto" fetchFormat="auto" />
//       </Image>
//     </CloudinaryContext>
//   )}
// </Grid>
// <Grid item xs={12}>
//   <Box display="flex" justifyContent="flex-end">
//     <Button type="submit" variant="contained" color="primary">
//       {props.submitButtonText}
//     </Button>
//   </Box>
// </Grid>
// {props.addCoachButton && (
//   <Grid item xs={12}>
//     <Box display="flex" justifyContent="flex-start" marginTop={2}>
//       <Button
//         variant="contained"
//         color="primary"
//         component={Link}
//         to="/coaches"
//       >
//         Add Coach
//       </Button>
//     </Box>
//   </Grid>
// )}
// </Grid>
// </form>
// );
// }

// export default CoachForm;
