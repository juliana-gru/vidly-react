import React from 'react';
import { withRouter } from 'react-router-dom';
import Joi from 'joi-browser';
import Form from './common/Form';
import { number } from 'prop-types';
import { getGenres } from '../services/fakeGenreService';
import { saveMovie } from './../services/fakeMovieService';


class MovieForm extends Form {
  state = {
    data: { title: "", genre: "Action", numberInStock: number, dailyRentalRate: number },
    errors: {}
  };

  getGenres() {
    return getGenres().map(genre => genre.name);    
  }
  

  schema = {
    title: Joi.string().required().label('Title'),
    genre: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().min(0).max(100).label('Number in Stock'),
    dailyRentalRate: Joi.number().min(0).max(10).label('Number in Stock')
  };
    
  doSubmit = () => {
    // call the server    
    saveMovie(this.state.data);
    console.log('submitted');
    this.props.history.push('/movies')
  }

  render() {
    // console.log(this.state.data.genre)
    return (
      <div>
        <h1>New Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          <label htmlFor="genre">Genre</label>
          <select id="genre" name="genre" classtitle="form-select mb-3" aria-label=".form-select-lg example">     
            {this.getGenres().map(genre => <option value={genre}>{genre}</option>)}
          </select>
          {this.renderInput('numberInStock', 'Number in Stock')}
          {this.renderInput('dailyRentalRate', 'Rate')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }  
}

// withRouter(MovieForm);
// export default MovieForm;