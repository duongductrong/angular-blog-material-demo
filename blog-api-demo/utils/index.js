const bcrypt = require("bcryptjs");
const { reject } = require("../db.config");

function Utils() {}

Utils.prototype.notify = (message, status, http_code, ...props) => {
  return {
    message: message,
    status: status,
    http_code: http_code,
    payload: [...props].map((prop) => prop),
  };
};

Utils.prototype.hash_password = (password) => {
  return new Promise((resolve, reject) => {
    return bcrypt.genSalt(10, function (err, salt) {
      if (err) return reject(false);

      return bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return reject(false);

        return resolve(hash);
      });
    });
  });
};

Utils.prototype.compare_password = (hash, new_password) => {
  return new Promise((resolve, reject) => {
    return bcrypt.compare(new_password, hash, function (err, res) {
      if (err) return reject(false);

      return resolve(res);
    });
  });
};

Utils.prototype.check_error = (errors) => {
  return Object.keys(errors).length > 0;
};

module.exports = new Utils();
