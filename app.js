const express = require("express");
const path = require("path");
const morgan = require("morgan");
const errorHandler = require("errorhandler");
// récupération d'index.js dans le folder routes
const index = require("./routes");

require("dotenv").config();

// Récupération de la base de données
require("./database");

// set une variable d'environnement dans package.json
// "start": "PORT=4000 nodemon app.js",
const port = process.env.PORT || 3000;

const app = express();

// référence app
exports.app = app;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

require("./config/session.config");
require("./config/passport.config");

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

// Gestion d'erreur en fonction de l'environnement
if (process.env.NODE_ENV === "development") {
  // Invoque un middleware pour la gestion d'erreur
  app.use(errorHandler);
} else {
  app.use((err, res, req, next) => {
    const code = err.code || 500;
    res.status(code).json({
      code: code || 500,
      message: code === 500 ? null : err.message,
    });
  });
}

app.listen(port);
