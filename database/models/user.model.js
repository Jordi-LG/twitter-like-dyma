const mongoose = require("mongoose");
const schema = mongoose.Schema;

// Schema pour les documents tweets
const userSchema = schema({
  content: {
    username: { type: String, required: true },
    local: {
      email: { type: String, required: true },
      password: { type: String, required: true },
    },
  },
});

// On associe le schema du document à la collection tweets
const User = mongoose.model("user", userSchema);

module.exports = User;
