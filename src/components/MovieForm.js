import React from 'react';
import { withRouter } from 'react-router-dom';
import Joi from 'joi-browser';
import Form from './common/Form';
import { number } from 'prop-types';
import { getGenres } from '../services/fakeGenreService';
import { getMovie, saveMovie } from './../services/fakeMovieService';


class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: number, dailyRentalRate: number },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().min(0).max(100).label('Number in Stock'),
    dailyRentalRate: Joi.number().min(0).max(10).label('Daily Rental Rate')
  };

  componentDidMount() {
    const genres = getGenres(); 
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");
    console.log(movie.genre._id)
    this.setState({ data: this.mapToViewModel(movie) })
    console.log(this.state.data.genreId)
  };

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };
  
    
  doSubmit = () => {
    // call the server    
    saveMovie(this.state.data);
    console.log('submitted');
    this.props.history.push('/movies')
  }

  render() {
    return (
      <div>
        {console.log(this.state.data.genreId)}
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number in Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }  
}

export default MovieForm;






// import React from 'react';

// const MovieForm = ({ match, history }) => {
//   return (
//     <div>
//       <h1>Movie Form {match.params.id} </h1>  
//       <button className="btn btn-primary" onClick={() => history.push('/movies')}>Save</button>
//     </div>
//   );
// }

// export default MovieForm;