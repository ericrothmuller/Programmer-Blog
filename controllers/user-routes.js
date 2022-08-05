const router = require("express").Router();
const {User} = require("../models");

router.post("/", async(req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


router.post("/login", async(req, res) => {
  try {

    const userEmail = await User.findOne({where: {email: req.body.email}});
    if (!userEmail) {
      res
        .status(400)
        .json({ message: "Wrong email. Please try again." });
      return;
    }

    const userPassword = await userData.checkPassword(req.body.password);
    if (!userPassword) {
      res
        .status(400)
        .json({ message: "Wrong password. Please try again." });
      return;
    }


    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;

      res.json({user: userData, message: "Logged in successfully!"});
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
