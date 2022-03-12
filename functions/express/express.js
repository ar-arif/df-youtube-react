"use strict";
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser);
app.get("/", (req, res) => {
  res.json({ server: "express" });
});

module.exports.handler = serverless(app);
