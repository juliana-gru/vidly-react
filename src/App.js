import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Movies from './components/Movies';
import LoginForm from './components/LoginForm';
import MovieForm from './components/MovieForm';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';
import MovieDetails from './components/MovieDetails';

import './App.css';

function App() {  
  
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/movies/:id" component={MovieForm}></Route>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/movies/:id" component={MovieDetails} ></Route>
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
