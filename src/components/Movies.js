import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';

import Pagination from './common/Pagination';
import ListGroup from './common/ListGroup';
import MoviesTable from './MoviesTable';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: {}
  }
  
  componentDidMount() {
    const genres = [{ name: 'All Genres'},...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movie => { //either use arrow function or bind function to state
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  }

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });  
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  }
  
  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });    
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies, genres, selectedGenre } = this.state; 
    
    if (count === 0) 
      return <p> There are no movies in the database.</p>
    
    const filtered = selectedGenre && selectedGenre._id
    ? allMovies.filter(m => m.genre._id === selectedGenre._id) 
    : allMovies;

    const movies = paginate(filtered, currentPage, pageSize)

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup 
          items={genres} 
          selectedItem={selectedGenre}
          onItemSelect={this.handleGenreSelect} 
          />
        </div>
        <div className="col">
          <p className="">Showing {filtered.length} in the database.</p>
          <MoviesTable 
            movies={movies} 
            onLike={this.handleLike} 
            onDelete={this.handleDelete} 
          />                
                  
          <Pagination 
            onClick={this.handlePageChange} 
            itemsCount={filtered.length} 
            pageSize={pageSize}
            currentPage={currentPage} 
          />
        </div>       
      </div>      
    )
  }
}

export default Movies;