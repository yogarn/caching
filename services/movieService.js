import repository from '../repositories/movieRepository.js';

async function getMovieBySlug(slug) {
    return await repository.getMovieBySlug(slug);
}

async function updateMovie(id, movie) {
    return await repository.updateMovie(id, movie);
}

export default {
    getMovieBySlug,
    updateMovie
}
