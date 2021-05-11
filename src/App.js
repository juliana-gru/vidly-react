import { Switch, Route, Redirect } from 'react-router-dom'
;
import Movies from './components/Movies';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import NotFound from './components/NotFound';
import NavBar from './components/common/NavBar';
import MovieDetails from './components/MovieDetails';

import './App.css';

function App() {  
  
  return (
    <div>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/movies/:id" component={MovieDetails} ></Route>
          <Route path="/customers" component={Customers} ></Route>
          <Route path="/rentals" component={Rentals} ></Route>        
          <Route path="/not-found" component={NotFound} ></Route> */
          <Redirect from="/" to="/movies" /> 
          <Redirect to="/not-found" /> 
        </Switch>
      </main> 
    </div>    
  );
};

export default App;
