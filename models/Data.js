const db = require("./connect");

function read(query, callback) {
  const page = query.page || 1;

  const limit = 5;
  const offset = limit * (page - 1);

  let sql = "SELECT * FROM data";
  let sqlcount = "SELECT count(*) as total FROM data";
  let queries = [];

  if (query.name) {
    queries.push(`name like '%${query.name}%'`);
  }

  if (query.height) {
    queries.push(`height = ${query.height}`);
  }

  if (query.weight) {
    queries.push(`weight = ${query.weight}`);
  }

  if (query.startdate && query.enddate) {
    queries.push(
      `birthdate BETWEEN '${query.startdate}' AND '${query.enddate}'`
    );
  } else if (query.startdate) {
    queries.push(`birthdate >= '${query.startdate}'`);
  } else if (query.enddate) {
    queries.push(`birthdate <= '${query.enddate}'`);
  }

  if (query.married) {
    queries.push(`married = ${query.married}`);
  }

  if (queries.length > 0) {
    sql += ` WHERE ${queries.join(` ${query.operation} `)}`;
    sqlcount += ` WHERE ${queries.join(` ${query.operation} `)}`;
  }

  db.get(sqlcount, function (err, count) {
    if (err) console.log(err);
    let pages = Math.ceil(count.total / limit);

    sql += ` limit ${limit} offset ${offset}`;

    db.all(sql, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        callback(data, page, pages, offset);
      }
    });
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
