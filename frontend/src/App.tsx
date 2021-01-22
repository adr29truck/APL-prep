import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import { getCurrentTime } from './features/time/selectors';

import Header from './components/header';
import { About } from './pages/About';
import { Login } from './pages/Login';
import { Home } from './pages/Home';

const App: React.FC = () => {
  const day = useSelector(getCurrentTime);
  return (
    <BrowserRouter>
      <Header />
      <Typography
        variant="h2"
        component="h2"
        gutterBottom
        className="text-center"
      >
        {day}
      </Typography>
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
