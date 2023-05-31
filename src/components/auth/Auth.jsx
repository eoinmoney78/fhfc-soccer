

import React, { useState } from 'react';
import Signup from './signup/Signup';
import Login from './login/Login';

import { Button, Col, Container, Row } from 'reactstrap';
import Logout from '../auth/logout/Logout';
import { useTheme } from '@mui/material/styles';


function Auth(props) {
  const [button, setButton] = useState('To Signup');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = useTheme();

  const swapForm = () => {
    button === 'To Login' ? setButton('To Signup') : setButton('To Login');
  };

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    props.updateToken(token);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    props.updateToken('');
  };

  const displayForm = () => {
    return button === 'To Login' ? (
      <Container>
        <Row>
          <Col md="4">
            <Signup updateToken={props.updateToken} />
          </Col>
        </Row>
      </Container>
    ) : (
      <Container>
        <Row>
          <Col md="4">
            <Login updateToken={handleLogin} />
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <>
      {isLoggedIn ? (
        <Logout onLogout={handleLogout} />
      ) : (
        <Button
        onClick={swapForm}
        style={{
          margin: '.5em',
          color: theme.palette.secondary.main,
        }}
      >
        {button}
      </Button>
      
      )}
      <br />
      {displayForm()}
    </>
  );
}

export default Auth;
