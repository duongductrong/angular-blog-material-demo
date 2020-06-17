const Utils = require("../../utils");
const jwt = require("jsonwebtoken");

module.exports = {
  isAuthenticate: (req, res, next) => {
    const headers = req.headers["authorization"]
      ? req.headers["authorization"].split(" ")
      : false;

    if (!headers) {
      res.status(403).json(Utils.notify("Xác thực thất bại", "error", 403));
      return;
    }

    const bear = headers[0];
    const token = headers[1];

    if (bear !== "duongductrong") {
      res.status(403).json(Utils.notify("Xác thực thất bại", "error", 403));
      return;
    }

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        res.status(403).json(Utils.notify("Xác thực thất bại", "error", 403));
        return;
      }

      res.locals.userLogin = decoded;
      next();
    });
  },
};
