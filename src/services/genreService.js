import http from './httpService.js';
import { localhost } from '../config/default.json';

export function getGenres() {
  return http.get(`${localhost}/genres`);
}