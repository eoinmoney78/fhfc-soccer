import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import TemporaryDrawer from '../layout/TemporaryDrawer';

const Home = () => {

  useEffect(() => {
    document.body.style.backgroundColor = 'royalblue';

        // Change it back when the component is unmounted
        return () => {
          document.body.style.backgroundColor = null;
        };
      }, []);
  return (
    <Container
    maxWidth="xs"
    style={{
      backgroundColor: '#3498db',
      borderRadius: '7px',
      overflow: 'auto',
      border: '2px solid black',
      boxShadow: '0 0 5px 2px rgba(0, 0, 0, 0.5)' // Add black border style
    }}
  >
 
      <nav>
        <TemporaryDrawer />
      </nav> 
      <Typography variant="h6" component="h5" align="center" gutterBottom>
     SLATE VALLEY UNITED FOOTBALL CLUB
      </Typography>
      <nav>
     

      </nav>
      <br />
      <Typography variant="h4" component="h5" align="left" gutterBottom>
        
      </Typography>
      <p>
        &nbsp; &nbsp; &nbsp; &nbsp; Welcome to the official website of Fair Haven Football Club!

At Fair Haven FC, we are passionate about the beautiful game of football. Our club is built on a foundation of dedication, teamwork, and a love for the sport. We strive to provide a platform for players of all ages and skill levels to come together, develop their abilities, and enjoy the thrill of competitive football.

With a rich history and a strong community presence, Fair Haven FC has become a beacon of football excellence in our region. Our club is committed to nurturing talent, fostering sportsmanship, and promoting a positive environment for players, coaches, and supporters alike.

Whether you're a player looking to join our ranks, a fan cheering from the sidelines, or a community member seeking to engage with local football activities, our website is your gateway to everything Fair Haven FC. Here, you'll find the latest news, match schedules, player profiles, and much more.

We invite you to explore our website, connect with our passionate football community, and be part of the Fair Haven FC family. Together, let's embrace the spirit of the game and create memorable moments both on and off the pitch.

Join us on this exciting journey as we continue to uphold the values of Fair Haven Football Club and strive for excellence in every aspect of the beautiful game.

Welcome to Fair Haven FC, where football dreams come to life!
      </p>
    </Container>
  );
};

export default Home;





