const lowdb = require("../db.config");

class Post {
  constructor(title, content, author, image) {
    this.id =
      lowdb.get("posts").value().length === 0
        ? 0
        : Math.max(
          ...lowdb
            .get("posts")
            .value()
            .map((el) => el.id)
        ) + 1;

    this.title = title;
    this.content = content;
    this.image = image;
    this.author = author;
    this.created = new Date().toString();
  }
}

module.exports = Post;
