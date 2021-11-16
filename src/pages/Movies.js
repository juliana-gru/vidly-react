import React, { Component } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';


import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import { paginate } from '../utils/paginate';


import Pagination from '../components/common/Pagination';
import ListGroup from '../components/common/ListGroup';
import MoviesTable from '../components/MoviesTable';
import { Link } from 'react-router-dom';
import SearchBar from '../components/common/SearchBar';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: {},
    sortColumn: { path: 'title', order: 'asc' }
  }
  
  async componentDidMount() {
    const { data } = await getGenres();
    const { data: movies } = await getMovies();
    const genres = [{ _id: '', name: 'All Genres' },...data];
    this.setState({ movies, genres });
  }

  handleDelete = async movie => { //either use arrow function or bind function to state
    const originalMovies = this.state.movies;
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
    
    try {
      await deleteMovie(movie._id);

    } catch(err) {
      if (err.response && err.response.status === 404)toast.error('This movie has already been deleted.');

      this.setState({ movies: originalMovies });
    }
    
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
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });   
  }

  handleSort = sortColumn => {    
    this.setState({ sortColumn });
  }

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: {}, currentPage: 1 })
  }

  getPagedData = () => {
    const { 
      pageSize, 
      currentPage, 
      sortColumn,
      selectedGenre,
      movies: allMovies,
      searchQuery       
    } = this.state; 

    let filtered = allMovies;
    
    if (searchQuery) filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);     

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  }

  render() {    
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn } = this.state; 
    const { user } = this.props;       
    
    const { totalCount, data: movies} = this.getPagedData();
    
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup 
          items={this.state.genres} 
          selectedItem={this.state.selectedGenre}
          onItemSelect={this.handleGenreSelect} 
          />
        </div>
        <div className="col">
          {user && 
            <Link to="/movies/new" className="btn btn-primary" style={{ marginBottom: 20 }}>New Movie
            </Link>          
          }


          <p>Showing {totalCount} in the database.</p>
          <SearchBar value={this.state.searchQuery} onSearch={this.handleSearch} />
          
          <MoviesTable 
            movies={movies}
            sortColumn={sortColumn} 
            onLike={this.handleLike} 
            onDelete={this.handleDelete}
            onSort={this.handleSort} 
          />                
                  
          <Pagination 
            onClick={this.handlePageChange} 
            itemsCount={totalCount} 
            pageSize={pageSize}
            currentPage={currentPage} 
          />
        </div>       
      </div>      
    )
  }
}

export default Movies;