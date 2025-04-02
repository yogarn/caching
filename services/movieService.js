import repository from '../repositories/movieRepository.js';

async function getMovieBySlug(slug) {
    return await repository.getMovieBySlug(slug);
}

export default {
    getMovieBySlug
}
