const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Jordi:azerty@cluster0.swsfo.mongodb.net/twitter?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connexion db twitter ok !");
  })
  .catch((err) => console.log(err));
