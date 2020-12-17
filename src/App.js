import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieHeader from './components/MovieHeader';
import SearchBox from './components/SearchBox';

const ApiKey = process.env.REACT_APP_SECRET_KEY;

function App() {
  const [movies, setMovies] = React.useState([]);
  const [searchMovie, setSearchMovie] = React.useState('');

  const getMovieRequest = async (searchMovie) => {
    const url = `http://www.omdbapi.com/?s=${searchMovie}&apikey=${ApiKey}`;

    const response = await fetch(url);
    const resJson = await response.json();

    if (resJson.Search) {
      setMovies(resJson.Search);
    }
  }

  React.useEffect(() => {
    getMovieRequest(searchMovie);
  }, [searchMovie]);

  return (
    <div className='container-fluid movie-app'>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieHeader heading='Movies' />
        <SearchBox searchMovie={searchMovie} setSearchMovie={setSearchMovie} />
      </div>
      {searchMovie.length > 0 ?
        <div className="row">
          <MovieList movies={movies} />
        </div>
        : 'Search your favorite movie!'
      }
    </div>
  );
}

export default App;
