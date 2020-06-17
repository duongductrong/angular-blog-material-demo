const Utils = require("../../utils");
const Post = require("../../objects/post.class");
const lowdb = require("../../db.config");

module.exports.gets = (req, res, next) => {
  res.locals.posts = lowdb.get("posts").sort().value();
  next();
};

module.exports.get = (req, res, next) => {
  const { postId } = req.params;

  const post = lowdb
    .get("posts")
    .find({ id: Number(postId) })
    .value();

  if (!post) {
    res
      .status(404)
      .json(Utils.notify("Bài viết này không tồn tại", "error", 404));
    return;
  }

  res.locals.post = post;
  next();
};

module.exports.create = (req, res, next) => {
  const errors = {};
  const { userLogin } = res.locals;
  const { title, content, image } = req.body;

  if (!title) {
    errors.title = Utils.notify("Tiêu đề không được để trống", "error", 400);
  }

  if (!content) {
    errors.content = Utils.notify(
      "Nội dung đăng tải không được để trống",
      "error",
      400
    );
  }

  if (!image) {
    errors.content = Utils.notify(
      "Hình ảnh đăng tải không được để trống",
      "error",
      400
    );
  }

  if (Utils.check_error(errors)) {
    res
      .status(400)
      .json(Utils.notify("Có lỗi xảy ra", "error", 400, { errors }));
    return;
  }

  res.locals.post = new Post(title, content, userLogin.id, image);
  next();
};

module.exports.put = (req, res, next) => {
  const { postId } = req.params;
  const { title, content } = req.body;

  const post = lowdb
    .get("posts")
    .find({ id: Number(postId) })
    .value();

  if (!post) {
    res
      .status(404)
      .json(Utils.notify("Bài viết này không tồn tại", "error", 404));
    return;
  }

  res.locals.post = {
    ...post,
    title,
    content,
  };
  next();
};

module.exports.delete = (req, res, next) => {
  const { postId } = req.params;

  const post = lowdb
    .get("posts")
    .find({ id: Number(postId) })
    .value();

  if (!post) {
    res
      .status(404)
      .json(Utils.notify("Bài viết này không tồn tại", "error", 404));
    return;
  }

  res.locals.post = post;
  next();
};
