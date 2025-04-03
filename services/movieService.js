import repository from '../repositories/movieRepository.js';

async function getAllMovies() {
    return await repository.getAllMovies();
}

async function getMovieBySlug(slug) {
    return await repository.getMovieBySlug(slug);
}

async function addMovie(movie) {
    return await repository.addMovie(movie);
}

async function updateMovie(id, movie) {
    return await repository.updateMovie(id, movie);
}

async function deleteMovieBySlug(slug) {
    return await repository.deleteMovieBySlug(slug);
}

export default {
    getAllMovies,
    getMovieBySlug,
    addMovie,
    updateMovie,
    deleteMovieBySlug
};
