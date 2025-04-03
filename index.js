import dotenv from 'dotenv/config';
import express from 'express';

import movieHandler from './handlers/movieHandler.js';
import movieValidator from './validator/movie.js'

const APP_PORT = process.env.APP_PORT;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Hello World!" });
})

app.get('/movies', movieHandler.getAllMoviesHandler);
app.post('/movies', movieValidator.validateMovie, movieHandler.addMovieHandler);
app.put('/movies/:id', movieValidator.validateMovie, movieHandler.updateMovieHandler);
app.get('/movies/:slug', movieHandler.getMovieHandler);
app.delete('/movies/:slug', movieHandler.deleteMovieHandler);

app.listen(APP_PORT, () => {
    console.log(`up and running on port ${APP_PORT}`);
});
