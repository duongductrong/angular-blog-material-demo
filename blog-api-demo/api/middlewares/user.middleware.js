const Utils = require("../../utils");
const User = require("../../objects/user.class");
const lowdb = require("../../db.config");

module.exports.getProfile = (req, res, next) => {
  const { id } = req.params;

  const user = lowdb
    .get("user")
    .find({ id: Number(id) })
    .value();

  if (!user) {
    res
      .status(404)
      .json(Utils.notify("Không tìm thấy người dùng", "error", 404));
    return;
  }

  res.locals.user = user;

  next();
};

module.exports.signup = async (req, res, next) => {
  let encode_password = null;
  const errors = {};
  const { username, password, fullname } = req.body;

  if (!username) {
    errors.username = Utils.notify(
      "Tài khoảng đăng ký không được để trống",
      "error",
      400
    );
  } else {
    let user_exist = lowdb
      .get("user")
      .value()
      .find((el) => el.username === username);

    if (user_exist) {
      errors.username = Utils.notify("Người dùng này đã tồn tại", "error", 400);
    }
  }

  if (!password) {
    errors.password = Utils.notify(
      "Mật khẩu không được để trống",
      "error",
      400
    );
  } else {
    encode_password = Utils.hash_password(password);
  }

  if (!fullname) {
    errors.fullname = Utils.notify(
      "Họ tên của bạn không được để trống",
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

  res.locals.user = new User(username, await encode_password, fullname);
  next();
};

module.exports.login = async (req, res, next) => {
  const errors = {};
  const { username, password } = req.body;

  const user = lowdb
    .get("user")
    .value()
    .find((el) => el.username === username);

  if (!user) {
    res
      .status(400)
      .json(Utils.notify("Tài khoản này không tồn tại", "error", 400));
    return;
  }

  if (!(await Utils.compare_password(user.password, password))) {
    res
      .status(400)
      .json(Utils.notify("Mật khẩu không chính xác", "error", 400));
  }

  if (Utils.check_error(errors)) {
    res
      .status(400)
      .json(Utils.notify("Có lỗi xảy ra", "error", 400, { errors }));

    return;
  }

  res.locals.user = user;
  next();
};
