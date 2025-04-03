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

app.put('/movies/:id', movieValidator.validateUpdateMovie, movieHandler.updateMovieHandler);
app.get('/movies/:slug', movieHandler.getMovieHandler);

app.listen(APP_PORT, () => {
    console.log(`up and running on port ${APP_PORT}`);
});
