const mongoose = require("mongoose");
const env = require(`../environnement/${process.env.NODE_ENV}`);

mongoose
  .connect(env.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connexion db twitter ok !");
  })
  .catch((err) => console.log(err));
