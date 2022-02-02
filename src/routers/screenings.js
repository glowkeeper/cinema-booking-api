const express = require("express");
const {
    getScreenings
} = require('../controllers/screenings');

const router = express.Router();

router.get("/", getScreenings);

module.exports = router;
