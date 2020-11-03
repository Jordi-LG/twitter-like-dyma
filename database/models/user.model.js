const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// Schema pour les documents tweets
const userSchema = schema({
  username: { type: String, required: true },
  local: {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hash(password, 12);
};

// On associe le schema du document à la collection tweets
const User = mongoose.model("user", userSchema);

module.exports = User;
