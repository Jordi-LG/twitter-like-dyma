const app = require("../app");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    // sauvegarder session même sans modification
    resave: false,
    // sauvegarder la session même sans utilisation par le user
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 14, // Validité 14 jours
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24 * 14,
    }),
  })
);
