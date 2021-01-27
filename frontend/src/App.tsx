import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { About } from './pages/About';
import { Login } from './pages/Login';
import { Home } from './pages/Home';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
