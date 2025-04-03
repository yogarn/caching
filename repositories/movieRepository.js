import pool from "../db.js";

async function getMovieBySlug(slug) {
    const result = await pool.query('SELECT * FROM movies WHERE slug = $1', [slug]);
    return result.rows;
}

export default {
    getMovieBySlug
}
