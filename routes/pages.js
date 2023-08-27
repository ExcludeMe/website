// Imports

const express = require("express");

// Router

const router = express.Router();

// Routes

router.get("/", (req, res) => {
    res.render("index");
});

// Exports

module.exports = router;
