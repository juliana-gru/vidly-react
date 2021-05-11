import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavBar = () => {
  
    return (
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand">Vidly</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/movies">Movies</NavLink>
            <NavLink className="nav-item nav-link" to="/customers">Customers</NavLink>
            <NavLink className="nav-item nav-link" to="/rentals">Rentals</NavLink>
          </div>
        </div>
      </div>
    );    
}

export default NavBar;