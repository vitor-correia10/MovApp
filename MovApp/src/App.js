import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
const ApiKey = process.env.REACT_APP_SECRET_KEY;

function App() {
  const [movies, setMovies] = React.useState([]);

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=star wars&apikey=${ApiKey}`;

    const response = await fetch(url);
    const resJson = await response.json();
    setMovies(resJson.Search)
  }

  React.useEffect(() => {
    getMovieRequest();
  }, []);

  return (
    <div className='container-fluid movie-app'>
      <div className="row">
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default App;
