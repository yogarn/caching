import { body } from "express-validator";

const validateMovie = [
    body("slug").notEmpty().withMessage("Slug is required"),
    body("title").notEmpty().withMessage("Title is required"),
    body("year").isInt().withMessage("Year must be an integer"),
    body("genres").notEmpty().withMessage("Genre must be an array"),
    body("director").notEmpty().withMessage("Director is required"),
    body("synopsis").notEmpty().withMessage("Synopsis is required"),
    body("rating").notEmpty().withMessage("Rating is required"),
    body("duration").notEmpty().withMessage("Duration is required"),
    body("poster").isURL().withMessage("Poster must be a valid URL"),
    body("release_date").isISO8601().withMessage("Invalid release date format"),
    body("language").notEmpty().withMessage("Language is required"),
    body("country").notEmpty().withMessage("Country is required"),
];

export default {
    validateMovie
}
