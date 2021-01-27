import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { About } from './pages/About';
import { Login } from './pages/Login';
import { Logout } from './pages/Logout';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
