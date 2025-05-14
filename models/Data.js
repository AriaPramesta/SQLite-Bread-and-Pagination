const db = require("./connect");

function read(callback) {
  db.all("SELECT * FROM data", function (err, data) {
    if (err) return err;
    callback(data);
  });
}

module.exports = { read };
