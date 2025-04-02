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

export default { getMovieHandler };
