const path = require("path");

module.exports = {
  dbUrl:
    "mongodb+srv://Jordi:kb5ak6R4soK8RNGo@cluster0.swsfo.mongodb.net/twitter?retryWrites=true&w=majority",
  cert: path.join(__dirname, "../ssl/local.crt"),
  key: path.join(__dirname, "../ssl/local.key"),
};
