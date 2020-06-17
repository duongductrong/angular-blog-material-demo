const lowdb = require("../../db.config");
const Utils = require("../../utils");
const jwt = require("jsonwebtoken");

module.exports.getProfile = (req, res) => {
  const { user } = res.locals;

  res.status(200).json(
    Utils.notify("Lấy dữ liệu thành công", "ok", 200, {
      user: { username: user.username, id: user.id, fullname: user.fullname },
    })
  );
};

module.exports.signup = (req, res) => {
  const { user } = res.locals;

  lowdb.get("user").push(user).write();

  res
    .status(200)
    .json(Utils.notify("Tạo tài khoản thành công", "ok", 200, {user}));
};

module.exports.login = (req, res) => {
  const { user } = res.locals;

  jwt.sign(user, "DUONG_DUC_TRONG", { expiresIn: "1 day" }, (err, encode) => {
    if (err) {
      res.status(500).json(Utils.notify("Đăng nhập thất bại", "error", 500));
      return;
    }

    res.status(200).json({
      ...Utils.notify("Đăng nhập thành công", "ok", 200),
      token: encode,
    });
  });
};
