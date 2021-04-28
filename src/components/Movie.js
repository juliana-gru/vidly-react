import React from 'react';

function Movie({movie, ...props}) {
  return (
    <tbody>
      <tr>
        <td>
          {console.log(movie.title)}
          {movie.title}
        </td>
      </tr>
      <tr>
        <td>
          {movie.genre}
        </td>
      </tr>
      <tr>
        <td>
          {movie.numberInStock}
        </td>
      </tr>
      <tr>
        <td>
          {movie.dailyRentalRate}
        </td>
      </tr>     
    </tbody>
  )
}

export default Movie;