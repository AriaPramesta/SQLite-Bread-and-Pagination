const Data = require("../models/Data");

function readData(req, res) {
  Data.read(req.query, function (data, page, pages) {
    const url = req.url == "/" ? "/?page=1" : req.url;
    res.render("data/list", { data, query: req.query, page, pages, url });
  });
}

function addForm(req, res) {
  res.render("data/form", { data: {} });
}

function addData(req, res) {
  Data.add(
    req.body.name,
    req.body.height,
    req.body.weight,
    req.body.birthdate,
    req.body.married,
    function (data) {
      res.redirect("/");
    }
  );
}

function deleteData(req, res) {
  const id = req.params.id;
  Data.remove(id, function (data) {
    res.redirect("/");
  });
}

function editData(req, res) {
  const id = req.params.id;
  Data.get(id, function (data) {
    res.render("data/form", { data });
  });
}

function updateData(req, res) {
  const id = req.params.id;
  Data.update(
    id,
    req.body.name,
    req.body.height,
    req.body.weight,
    req.body.birthdate,
    req.body.married,
    function (data) {
      res.redirect("/");
    }
  );
}

module.exports = {
  readData,
  addForm,
  addData,
  deleteData,
  editData,
  updateData,
};
