import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Movies from './pages/Movies';
import LoginForm from './pages/LoginForm';
import Logout from './pages/Logout';
import RegisterForm from './pages/RegisterForm';
import MovieForm from './pages/MovieForm';
import NotFound from './pages/NotFound';

import NavBar from './components/NavBar';
import MovieDetails from './components/MovieDetails';
import ProtectedRoute from './components/common/ProtectedRoute';

import auth from './services/authService';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [ user, setUser ] = useState(null);
  
  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser(user);
  }, [])
  
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar user={user}/>
      <main className="container">
        <Switch>
          <Route path="/register" component={RegisterForm}></Route>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/logout" component={Logout}></Route>

          <ProtectedRoute path="/movies/:id" component ={MovieForm} />
          
          <Route path="/movies/:id" component={MovieDetails} />
          
          <Route 
            path="/movies" 
            render={props => <Movies {...props} user={user} />}>
          </Route>   
          <Route path="/not-found" component={NotFound} ></Route> */
          <Redirect from="/" exact to="/movies" /> 
          <Redirect to="/not-found" /> 
        </Switch>
      </main> 
    </React.Fragment>    
  );
};

export default App;
