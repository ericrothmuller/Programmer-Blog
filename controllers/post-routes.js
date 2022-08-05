const router = require("express").Router();
const {Post} = require("../models");

router.post("/", async(req, res) => {
  try {
    if (!req.session.loggedIn) {
      res
        .status(400)
        .json({message: "You must be logged in." });
      return;
    }

    Post.create({
      user_id: req.session.userId,
      title: req.body.title,
      body: req.body.body,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
