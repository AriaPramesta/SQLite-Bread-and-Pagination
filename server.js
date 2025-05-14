const express = require("express");
const { readData } = require("./controllers/dataController");

const app = express();

app.set("view engine", "ejs");

app.get("/", readData);

app.listen(3000, function () {
  console.log("web berjalan di port 3000");
});
