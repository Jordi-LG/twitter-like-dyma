const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

// app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "pug");

app.listen(port);
