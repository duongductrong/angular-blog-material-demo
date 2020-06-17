const lowdb = require("../db.config");

module.exports = class User {
  constructor(username, password, fullname) {
    this.id =
      lowdb.get("user").value().length === 0
        ? 0
        : Math.max(
            ...lowdb
              .get("user")
              .value()
              .map((el) => el.id)
          ) + 1;
    this.username = username;
    this.password = password;
    this.fullname = fullname;
  }

  getUsername() {
    return this.username;
  }

  getPassword() {
    return this.password;
  }

  getFullname() {
    return this.fullname;
  }

  setUsername(username) {
    this.username = username;
  }

  setPassword(password) {
    this.password = password;
  }

  setFullname(fullname) {
    this.fullname = fullname;
  }
};
