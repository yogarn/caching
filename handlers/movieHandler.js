import { validationResult } from "express-validator";
import service from '../services/movieService.js';

async function getAllMoviesHandler(req, res) {
  try {
      const movies = await service.getAllMovies();
      res.json({ data: movies });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while fetching all movies." });
  }
}

async function getMovieHandler(req, res) {
  try {
    const { slug } = req.params;
    const movie = await service.getMovieBySlug(slug);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found." });
    }
    res.json({ data: movie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching movie details." });
  }
}

async function addMovieHandler(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newMovie = await service.addMovie(req.body);
    res.status(201).json({ data: newMovie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while adding the movie." });
  }
}

async function updateMovieHandler(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const updatedMovie = await service.updateMovie(id, req.body);
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found." });
    }
    res.json({ data: updatedMovie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating movie details." });
  }
}

async function deleteMovieHandler(req, res) {
  try {
    const { slug } = req.params;
    const deleted = await service.deleteMovieBySlug(slug);
    if (!deleted) {
      return res.status(404).json({ message: "Movie not found." });
    }
    res.json({ message: "Movie deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while deleting the movie." });
  }
}

export default {
  getAllMoviesHandler,
  getMovieHandler,
  addMovieHandler,
  updateMovieHandler,
  deleteMovieHandler
};
