const Data = require("../models/Data");

function readData(req, res) {
  Data.read(function (data) {
    res.render("data/list", { data });
  });
}

module.exports = { readData };
