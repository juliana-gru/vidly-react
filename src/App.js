import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Movies from './pages/Movies';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import Rentals from './pages/Rentals';
import Customers from './pages/Customers';

import MovieForm from './pages/MovieForm';
import NotFound from './pages/NotFound';
import NavBar from './components/NavBar';
import MovieDetails from './components/MovieDetails';

import './App.css';

function App() {  
  
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/register" component={RegisterForm}></Route>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/movies/:id" component={MovieForm}></Route>
          <Route path="/movies/:id" component={MovieDetails} ></Route>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/customers" component={Customers} ></Route>
          <Route path="/rentals" component={Rentals} ></Route>        
          <Route path="/not-found" component={NotFound} ></Route> */
          <Redirect from="/" exact to="/movies" /> 
          <Redirect to="/not-found" /> 
        </Switch>
      </main> 
    </React.Fragment>    
  );
};

export default App;
