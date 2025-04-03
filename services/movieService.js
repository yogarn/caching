import repository from '../repositories/movieRepository.js';
import cache from '../redis.js';

async function getAllMovies() {
    const cacheKey = 'all_movies';
    
    const cachedMovies = await cache.getCache(cacheKey);
    if (cachedMovies) {
        console.log('Returning cached movies data');
        return cachedMovies;
    }

    const movies = await repository.getAllMovies();
    await cache.setCache(cacheKey, 3600, movies);
    
    return movies;
}

async function getMovieBySlug(slug) {
    const cacheKey = `movie_${slug}`;
    
    const cachedMovie = await cache.getCache(cacheKey);
    if (cachedMovie) {
        console.log('Returning cached movie data');
        return cachedMovie;
    }

    const movie = await repository.getMovieBySlug(slug);

    if (movie) {
        await cache.setCache(cacheKey, 3600, movie);
    }

    return movie;
}

async function addMovie(movie) {
    const addedMovie = await repository.addMovie(movie);
    
    await cache.setCache('all_movies', 3600, null);

    return addedMovie;
}

async function updateMovie(id, movie) {
    const updatedMovie = await repository.updateMovie(id, movie);
    
    await cache.setCache('all_movies', 3600, null);
    await cache.setCache(`movie_${updatedMovie.slug}`, 3600, null);

    return updatedMovie;
}

async function deleteMovieBySlug(slug) {
    const deletedMovie = await repository.deleteMovieBySlug(slug);
    
    await cache.setCache('all_movies', 3600, null);
    await cache.setCache(`movie_${deletedMovie.slug}`, 3600, null);

    return deletedMovie;
}

export default {
    getAllMovies,
    getMovieBySlug,
    addMovie,
    updateMovie,
    deleteMovieBySlug
};
