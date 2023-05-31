



import React, {  useRef } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import FullButton from '../../button/FullButton';
import { useNavigate } from 'react-router-dom';

console.log('PORT:', process.env.PORT)
const SignupContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 20,
  '& .MuiTextField-root': {
    marginBottom: 10,
    width: '100%',
    maxWidth: 400,
  },
});

function Signup({ updateToken }) {

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const first = firstNameRef.current.value;
    const last = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    let bodyObj = JSON.stringify({
      firstName: first,
      lastName: last,
      email,
      password,
    });


    const url = `${baseURL}/user/signup`;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = {
      headers,
      body: bodyObj,
      method: 'POST',
    };

    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();

      if (data.user) {
        updateToken(data.token);
        navigate('/dashboard');
      } else {
        alert("Incorrect username or password. Please try again.");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <SignupContainer>
      <Typography variant="h2" component="h2" align="center" gutterBottom>
        Signup
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
              required
              label="First Name"
              inputRef={firstNameRef}
              variant="outlined"
            />
        <TextField
            required
            label="Last Name"
            inputRef={lastNameRef}
            variant="outlined"
          />
        <TextField
          required
          label="Email"
          type="email"
          inputRef={emailRef}
          variant="outlined"
        />
        <TextField
          required
          label="Password"
          type="password"
          inputRef={passwordRef}
          variant="outlined"
        />
        <FullButton>
          <Button type="submit" variant="contained" color="secondary">
            Signup
          </Button>
        </FullButton>
      </form>
    </SignupContainer>
  )
}

export default Signup;
