import http from './httpService';
import { localhost } from '../config/default.json';

const apiEndpoint = localhost + "/movies";

function movieUrl(id) {
  return `${apiEndpoint}/${id}`
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  //if movie already exists
  if (movie._id) {
    const body = {...movie};
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }
  //if it's a new movie
  return http.post(apiEndpoint, movie)
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}