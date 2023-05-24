

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/login/Login';
import Signup from './components/auth/signup/Signup';
import Logout from './components/auth/logout/Logout';

function App() {
  const [token, setToken] = useState(null);

  const updateToken = (newToken) => {
    setToken(newToken);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login updateToken={updateToken} />
        </Route>
        <Route exact path="/signup">
          <Signup updateToken={updateToken} />
        </Route>
        <Route exact path="/logout">
          <Logout updateToken={updateToken} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
