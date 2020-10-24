const mongoose = require("mongoose");
const schema = mongoose.Schema;

// Schema pour les documents tweets
const tweetSchema = schema({
  content: { type: String, maxlength: 140, minlength: 1, required: true },
});

// On associe le schema du document à la collection tweets
const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;
