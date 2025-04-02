import dotenv from 'dotenv/config';
import express from 'express';
import movieHandler from './handlers/movieHandler.js';

const app = express();
const APP_PORT = process.env.APP_PORT;

app.get('/', (req, res) => {
    res.json({ message: "Hello World!" });
})

app.get('/movies/:slug', movieHandler.getMovieHandler);

app.listen(APP_PORT, () => {
    console.log(`up and running on port ${APP_PORT}`);
});
