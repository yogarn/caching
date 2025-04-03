import { validationResult } from "express-validator";
import service from '../services/movieService.js';

async function getMovieHandler(req, res) {
  try {
    const { slug } = req.params;
    const movie = await service.getMovieBySlug(slug);
    res.json({ data: movie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching movie details.' });
  }
};

async function updateMovieHandler(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const updatedMovie = await service.updateMovie(id, req.body);
    res.json({ data: updatedMovie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating movie details.' });
  }
}

export default {
  getMovieHandler, updateMovieHandler
};
