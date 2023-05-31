import React from 'react';
import { Container, Typography } from '@mui/material';
import TemporaryDrawer from '../layout/TemporaryDrawer';

const Home = () => {
  return (
    <Container maxWidth="xs">
      <nav>
        <TemporaryDrawer />
      </nav> 
      <Typography variant="h2" component="h1" align="center" gutterBottom>
      Fair Haven Football Club
      </Typography>
      <nav>
      {/* <img src="https://res.cloudinary.com/dns9ltiu8/image/upload/v1682379643/coffee_beans-cup_nt08zx.jpg" alt="Cup of coffee with pile of coffee beans" width="400" height="250" /> */}


      </nav>
      <br />
      <Typography variant="h4" component="h1" align="left" gutterBottom>
        About
      </Typography>
      <p>
        &nbsp; &nbsp; &nbsp; &nbsp; Espresso originated in Italy in the early 20th century. The first espresso machine was created in 1901 by Luigi Bezzera, an Italian inventor, who wanted to make a quick cup of coffee that was stronger and richer than traditional drip coffee.

        Bezzera's machine used steam to force water through finely ground coffee beans, producing a concentrated shot of coffee with a layer of crema on top. This method of making coffee quickly gained popularity in Italy and soon spread to other parts of Europe and the world.

        The term "espresso" comes from the Italian word "esprimere," which means "to express" or "to force out." This refers to the method of forcing water through the coffee grounds under high pressure to extract the rich and bold flavors.

        Today, espresso is a popular drink enjoyed all over the world, and has evolved into various forms such as cappuccinos, lattes, and macchiatos, each with its own unique twist on the classic espresso shot.
      </p>
    </Container>
  );
};

export default Home;





