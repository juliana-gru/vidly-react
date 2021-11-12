import http from './httpService';
import { localhost } from '../config/default.json';
import jwtDecode from 'jwt-decode';

const apiEndpoint = localhost + "/auth";
const tokenKey = 'token';

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password } );
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {  
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
   
  } catch (error) {return null} 
}

const auth = {
  login,
  loginWithJwt,
  logout,
  getCurrentUser
}

export default auth;