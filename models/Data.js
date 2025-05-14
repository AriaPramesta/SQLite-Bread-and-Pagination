const db = require("./connect");

function read(callback) {
  db.all("SELECT * FROM data", function (err, data) {
    if (err) return err;
    callback(data);
  });
}

function add(name, height, weight, birthdate, married, callback) {
  db.run(
    "INSERT INTO data (name, height, weight, birthdate, married) VALUES (?, ?, ?, ?, ?)",
    [name, height, weight, birthdate, married],
    function (err) {
      if (err) return err;
      callback();
    }
  );
}

function remove(id, callback) {
  db.run("DELETE FROM data WHERE id = ?", [id], function (err) {
    if (err) return err;
    callback();
  });
}

function get(id, callback) {
  db.get("SELECT * FROM data WHERE id = ?", [id], function (err, data) {
    if (err) return err;
    callback(data);
  });
}

function update(id, name, height, weight, birthdate, married, callback) {
  db.run(
    "UPDATE data SET name = ?, height = ?, weight = ?, birthdate = ?, married = ?  WHERE id = ?",
    [name, height, weight, birthdate, married, id],
    function (err) {
      if (err) return err;
      callback();
    }
  );
}

module.exports = { read, add, remove, get, update };
