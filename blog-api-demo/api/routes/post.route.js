const router = require("express").Router();

const validate = require("../validates/validate");
const middleware = require("../middlewares/post.middleware");
const controller = require("../controllers/post.controller");

router.get("/", validate.isAuthenticate, middleware.gets, controller.gets);
router.get("/:postId", validate.isAuthenticate, middleware.get, controller.get);
router.post("/", validate.isAuthenticate, middleware.create, controller.create);
router.put("/:postId", validate.isAuthenticate, middleware.put, controller.put);
router.delete(
  "/:postId",
  validate.isAuthenticate,
  middleware.delete,
  controller.delete
);

module.exports = router;
