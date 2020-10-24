const express = require("express");
const path = require("path");
const morgan = require("morgan");
// récupération d'index.js dans le folder routes
const index = require("./routes");
// Récupération de la base de données
require("./database");

// set une variable d'environnement dans package.json
// "start": "PORT=4000 nodemon app.js",
const port = process.env.PORT || 3000;

const app = express();
// app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "pug");

// ==== MIDDLEWARE EXPRESS
// Je récupère les fichiers que je retournerai à l'utilisateur via le middleware static
app.use(express.static(path.join(__dirname, "public")));

// Récuperation de la data via la methode POST
app.use(express.json());
// Récuperation de la data mais autre format que JSON
// + object complexe avec true
app.use(express.urlencoded({ extended: true }));
// middleware logger
app.use(morgan("short"));

app.use(index);

app.listen(port);
