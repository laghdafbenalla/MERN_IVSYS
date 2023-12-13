// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/Auth/PrivateRoute';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        {/* Add more routes as needed */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
