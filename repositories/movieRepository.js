import pool from "../db.js";

async function simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getAllMovies() {
    await simulateDelay(100);
    const result = await pool.query("SELECT * FROM movies;");
    return result.rows;
}

async function getMovieBySlug(slug) {
    await simulateDelay(100);
    const movieResult = await pool.query(`
        SELECT * FROM movies WHERE slug = $1;
    `, [slug]);

    return movieResult.rowCount ? movieResult.rows[0] : null;
}

async function addMovie(movie) {
    const { slug, title, year, director, synopsis, rating, duration, poster, release_date, language, country, genres } = movie;

    const result = await pool.query(`
        INSERT INTO movies (slug, title, year, director, synopsis, rating, duration, poster, release_date, language, country, genres)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *;
    `, [slug, title, year, director, synopsis, rating, duration, poster, release_date, language, country, genres]);

    return result.rows[0];
}

async function updateMovie(id, movie) {
    const { slug, title, year, director, synopsis, rating, duration, poster, release_date, language, country, genres } = movie;

    const result = await pool.query(`
        UPDATE movies
        SET slug = $2, title = $3, year = $4, director = $5, synopsis = $6, 
            rating = $7, duration = $8, poster = $9, release_date = $10, 
            language = $11, country = $12, genres = $13
        WHERE id = $1
        RETURNING *;
    `, [id, slug, title, year, director, synopsis, rating, duration, poster, release_date, language, country, genres]);

    return result.rows[0];
}

async function deleteMovieBySlug(slug) {
    const result = await pool.query(`
        DELETE FROM movies WHERE slug = $1 RETURNING *;
    `, [slug]);

    return result.rowCount ? result.rows[0] : null;
}

export default {
    getAllMovies,
    getMovieBySlug,
    addMovie,
    updateMovie,
    deleteMovieBySlug
};
