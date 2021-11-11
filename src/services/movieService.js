import http from './httpService';
import { localhost } from '../config/default.json';

export function getMovies() {
  return http.get(`${localhost}/movies`);
}

export function deleteMovie(movieId) {
  return http.delete(`${localhost}/movies/${movieId}`);
}