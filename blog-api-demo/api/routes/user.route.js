const router = require("express").Router();

const middleware = require("../middlewares/user.middleware");
const controller = require("../controllers/user.controller");
const validate = require("../validates/validate");

const Utils = require("../../utils");

router.get(
  "/profile/:id",
  validate.isAuthenticate,
  middleware.getProfile,
  controller.getProfile
);
router.post("/signup", middleware.signup, controller.signup);
router.post("/login", middleware.login, controller.login);

router.get("/tokenIsLive", validate.isAuthenticate, (req, res) => {
  const { userLogin } = res.locals;

  res.status(200).json(
    Utils.notify("The token is live", "ok", 200, { userLogin })
  )
})

module.exports = router;
