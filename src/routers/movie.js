const express = require("express");
const {
    getMovies,
    getAllScreenings,
    getRuntimes,
    getMovieScreenings,
    createMovie
} = require('../controllers/movie');

const router = express.Router();

router.get("/", getMovies);
router.get("/screenings", getAllScreenings);
router.get("/runtimes", getRuntimes);
router.get("/runtimes?lessthan=:runtime", getRuntimes)
router.get("/runtimes?greaterthan=:runtime", getRuntimes)
router.get("/screenings/:movieId", getMovieScreenings);

router.post("/create", createMovie);

module.exports = router;
