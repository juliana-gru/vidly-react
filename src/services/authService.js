import http from './httpService';
import { localhost } from '../config/default.json';

const apiEndpoint = localhost + "/auth";

export function login(email, password) {
  return http.post(apiEndpoint, { email, password } );
}