const lowdb = require("../../db.config");
const Utils = require("../../utils");

module.exports.gets = (req, res, next) => {
  const { posts } = res.locals;

  res
    .status(200)
    .json(Utils.notify("Lấy dữ liệu thành công", "ok", 200, { posts }));
};

module.exports.get = (req, res, next) => {
  const { post } = res.locals;

  res
    .status(200)
    .json(Utils.notify("Lấy dữ liệu thành công", "ok", 200, { post }));
};

module.exports.create = (req, res, next) => {
  const { post } = res.locals;

  lowdb.get("posts").push(post).write();

  res
    .status(200)
    .json(Utils.notify("Tạo bài viết mới thành công", "ok", 200, { post }));
};

module.exports.put = (req, res) => {
  const { post } = res.locals;

  lowdb
    .update("posts", (posts) => {
      return posts.map((pos) => {
        if (pos.id === post.id) {
          return post;
        }
        return pos;
      });
    })
    .write();

  res
    .status(200)
    .json(Utils.notify("Cập nhật thành công", "ok", 200, { post }));
};

module.exports.delete = (req, res) => {
  const { post } = res.locals;

  lowdb.get("posts").remove({ id: post.id }).write();

  res.status(200).json *
    Utils.notify("Xóa bài viết thành công", "ok", 200, { deleted: true });
};
