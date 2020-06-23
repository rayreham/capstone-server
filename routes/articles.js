var express = require("express");
var router = express.Router();
const { Article } = require("../database/models");

/* GET all campuses. */
// /api/campuses
router.get("/", async (req, res, next) => {
  // try to get campuses object from database
  try {
    // campuses will be the result of the Campus.findAll promise
    const articles = await Article.findAll();
    // if articles is valid, it will be sent as a json response
    console.log(articles);
    res.status(200).json(articles);
  } catch (err) {
    // if there is an error, it'll passed via the next parameter to the error handler middleware
    next(err);
  }
});

module.exports = router;
