import http from './httpService';
import { localhost } from '../config/default.json';

const apiEndpoint = localhost + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}