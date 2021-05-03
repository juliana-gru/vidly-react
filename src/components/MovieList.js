import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';

import Like from './common/Like';
import Pagination from './common/Pagination';

class MovieList extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1
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

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state; 
    
    if (count === 0) 
      return <p> There are no movies in the database.</p>
    
    const movies = paginate(allMovies, currentPage, pageSize)

    return (
      <>
        <p className="">Showing {count} in the database.</p>
         
        <table className="table">
          <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
                <th></th>
              </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td><Like liked={movie.liked} onClick={() => this.handleLike(movie)}/></td>
                <td><button onClick={() =>this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
              </tr>            
            ))} 
          </tbody>        
        </table>        
        <Pagination 
        onClick={this.handlePageChange} 
        itemsCount={count} 
        pageSize={pageSize}
        currentPage={currentPage} />
      </>      
    )
  }
}

export default MovieList;