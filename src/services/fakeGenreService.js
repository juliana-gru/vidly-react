import axios from 'axios';
import config from '../config/default.json';
const genres = [{"_id":"613b8237c89b7700166cab6d","name":"Action","__v":0},{"_id":"613b818ec89b7700166cab6b","name":"Animation","__v":0},{"_id":"613b8240c89b7700166cab6e","name":"Comedy","__v":0},{"_id":"613b8176c89b7700166cab6a","name":"Documentary","__v":0},{"_id":"6087a7c4eb1f2f001544cd27","name":"Drama","__v":0},{"_id":"613b8191c89b7700166cab6c","name":"Musical","__v":0},{"_id":"613b8246c89b7700166cab6f","name":"Romance","__v":0},{"_id":"6087a7dceb1f2f001544cd28","name":"Thriller","__v":0}]

const headers ={
  headers: {
    "Access-Control-Allow-Origin": "localhost:3000",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
} 

async function getGenres() {
  const response = await axios.get(config.apiEndpoint, headers);
  console.log(response);
  return response.data.genres;
}

export { getGenres, genres };