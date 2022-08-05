const router = require("express").Router();

const homeRoutes = require("./home-routes");
router.use("/", homeRoutes);

const postRoutes = require("./post-routes");
router.use("/posts", postRoutes);

const userRoutes = require("./user-routes");
router.use("/users", userRoutes);

module.exports = router;
