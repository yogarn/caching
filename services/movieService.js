import repository from '../repositories/movieRepository.js';

async function getAllMovies() {
    // get movies data from cache

    const movies = await repository.getAllMovies();
    
    // set new cache if necessary
    
    return movies;
}

async function getMovieBySlug(slug) {
    // get movie data from cache

    const movie = await repository.getMovieBySlug(slug);

    // set new cache if necessary (and if movie exist)

    return movie;
}

async function addMovie(movie) {
    const addedMovie = await repository.addMovie(movie);
    
    // set new cache

    return addedMovie;
}

async function updateMovie(id, movie) {
    const updatedMovie = await repository.updateMovie(id, movie);
    
    // set new cache

    return updatedMovie;
}

async function deleteMovieBySlug(slug) {
    const deletedMovie = await repository.deleteMovieBySlug(slug);
    
    // set new cache

    return deletedMovie;
}

export default {
    getAllMovies,
    getMovieBySlug,
    addMovie,
    updateMovie,
    deleteMovieBySlug
};
