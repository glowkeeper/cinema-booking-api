const express = require("express");
const {
    getMovies,
    getAllScreenings,
    getMovieScreenings
} = require('../controllers/movie');

const router = express.Router();

router.get("/", getMovies);
router.get("/screenings", getAllScreenings);
router.get("/screenings/:movieId", getMovieScreenings);

module.exports = router;
