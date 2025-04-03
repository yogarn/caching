import pool from "../db.js";

async function getMovieBySlug(slug) {
    const movieResult = await pool.query(`
        SELECT * FROM movies WHERE slug = $1;
    `, [slug]);

    if (!movieResult.rowCount) return null;

    const movie = movieResult.rows[0];
    const genreResult = await pool.query(`
        SELECT genres.name 
        FROM genres
        JOIN movie_genres ON genres.id = movie_genres.genre_id
        WHERE movie_genres.movie_id = $1;
    `, [movie.id]);

    movie.genres = genreResult.rows.map(row => row.name);

    return movie;
}

async function updateMovie(id, movie) {
    const { slug, title, year, director, synopsis, rating, duration, poster, release_date, language, country, genre } = movie;

    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        const updateMovieResult = await client.query(`
            UPDATE movies
            SET slug = $2, title = $3, year = $4, director = $5, synopsis = $6, rating = $7, duration = $8, poster = $9, release_date = $10, language = $11, country = $12
            WHERE id = $1
            RETURNING *;
        `, [id, slug, title, year, director, synopsis, rating, duration, poster, release_date, language, country]);

        const updatedMovie = updateMovieResult.rows[0];
        await client.query('DELETE FROM movie_genres WHERE movie_id = $1', [id]);

        if (genre && genre.length > 0) {
            for (const g of genre) {
                const genreResult = await client.query('SELECT id FROM genres WHERE name = $1', [g]);
                const genreId = genreResult.rows[0]?.id;

                if (genreId) {
                    await client.query('INSERT INTO movie_genres(movie_id, genre_id) VALUES ($1, $2)', [id, genreId]);
                } else {
                    const newGenreResult = await client.query('INSERT INTO genres(name) VALUES ($1) RETURNING id', [g]);
                    const newGenreId = newGenreResult.rows[0].id;
                    await client.query('INSERT INTO movie_genres(movie_id, genre_id) VALUES ($1, $2)', [id, newGenreId]);
                }
            }
        }

        await client.query('COMMIT');
        return updatedMovie;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

export default {
    getMovieBySlug,
    updateMovie
}
