import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieHeader from './components/MovieHeader';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';

const ApiKey = process.env.REACT_APP_SECRET_KEY;

function App() {
  const [movies, setMovies] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
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

  React.useEffect(() => {
    const movieFavorites = JSON.parse(localStorage.getItem('MovApp'));

    setFavorites(movieFavorites);
  }, []);


  const saveToLocalStorage = (items) => {
    localStorage.setItem('MovApp', JSON.stringify(items))
  };

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  }

  const removeFavoriteMovie = (movie) => {
    const updateFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );
    setFavorites(updateFavoriteList);
    saveToLocalStorage(updateFavoriteList);
  }

  return (
    <div className='container-fluid movie-app'>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieHeader heading='Movies' />
        <SearchBox searchMovie={searchMovie} setSearchMovie={setSearchMovie} />
      </div>
      {searchMovie.length > 0 ?
        <div className="row">
          <MovieList
            movies={movies}
            handleFavorites={addFavoriteMovie}
            favoriteComponent={AddFavorites}
          />
        </div>
        : 'Search your favorite movies!'
      }
      { favorites.length > 0 ?
        <>
          <div className="row d-flex align-items-center mt-4 mb-4">
            <MovieHeader heading={favorites.length > 1 ? 'Favorites' : 'Favorite'} />
          </div>
          <div className="row">
            <MovieList
              movies={favorites}
              handleFavorites={removeFavoriteMovie}
              favoriteComponent={RemoveFavorites}
            />
          </div>
        </>
        : ''
      }
    </div>
  );
}

export default App;
