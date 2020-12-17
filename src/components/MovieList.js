import React from 'react';
import './MovieList.css';

const MovieList = ({ movies }) => {
    return (
        <>
            {movies.map((movie, index) => (
                <div className="image-container d-flex justify-content-start m-3" key={movie.Title}>
                    <img src={movie.Poster} alt={`${movie.Title} image`}></img>
                    <div className="overlay d-flex align-items-center justify-content-center">
                    </div>
                </div>
            ))
            }
        </>
    )
}

export default MovieList;