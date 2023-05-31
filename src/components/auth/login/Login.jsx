import React, { useRef } from 'react';
import { styled } from '@mui/material/styles';
import {
  Typography,
  Paper,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FullButton from '../../button/FullButton';
import { baseURL } from '../../../environment';

const LoginContainer = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 20,
  marginTop: 20,
  '& h2': {
    marginBottom: 20,
  },
  '& form': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    '& .MuiFormControl-root': {
      width: '100%',
      marginBottom: 20,
    },
    '& .MuiTextField-root': {
      width: '100%',
      maxWidth: '50%',
    },
  },
});

function Login({ updateToken }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const handleSubmit = async e => {
    e.preventDefault();
  
    const bodyObj = JSON.stringify({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    const url = `${baseURL}/user/login`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: bodyObj,
      });
  
      const data = await res.json();
      console.log('data:', data); // see the value of the data object
      emailRef.current.value = '';
      passwordRef.current.value = '';
  
      if (data.user && data) {
        updateToken(data.token);
        console.log('DataToken:', data.user);
      // see if the admin dashboard route is being navigated to

  
        navigate('/dashboard'); // Navigate to the regular user dashboard route on successful login
      } else {
        alert('Try a different email or password');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <LoginContainer elevation={3}>
        <Typography variant="h2" component="h2" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            inputRef={emailRef}
            type="email"
            label="Email"
            variant="outlined"
            autoComplete="off"
            required
            sx={{ width: '100%', maxWidth: '50%' }}
          />
          <TextField
            inputRef={passwordRef}
            type="password"
            label="Password"
            variant="outlined"
            autoComplete="off"
            required
            sx={{ width: '100%', maxWidth: '50%' }}
          />
          <Box width="50%" marginTop={2}>
            <FullButton>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ width: '100%', maxWidth: '50%' }}
              >
                Login
              </Button>
            </FullButton>
          </Box>
        </form>
      </LoginContainer>
    </>
  );
}

export default Login;




