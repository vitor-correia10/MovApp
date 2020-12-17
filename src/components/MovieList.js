import React from 'react';
import './MovieList.css';

const MovieList = ({ movies, favoriteComponent, handleFavorites }) => {
    const FavoriteComponent = favoriteComponent;

    console.log('handleFavorites', handleFavorites)
    return (
        <>
            {movies.map((movie, index) => (
                <div className="image-container d-flex justify-content-start m-3 p-1" key={movie.Title}>
                    <img className="movieBanner" src={movie.Poster} alt={`${movie.Title} image`}></img>
                    <div onClick={() => handleFavorites(movie)} className="overlay d-flex align-items-center justify-content-center">
                        <FavoriteComponent />
                    </div>
                </div>
            ))
            }
        </>
    )
}

export default MovieList;