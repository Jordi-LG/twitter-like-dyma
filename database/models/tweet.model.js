const mongoose = require("mongoose");
const schema = mongoose.Schema;

// Schema pour les documents tweets
const tweetSchema = schema({
  content: {
    type: String,
    maxlength: [140, "Tweet trop long"],
    minlength: [1, "Tweet trop court"],
    required: [true, "Champ requis"],
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
});

// On associe le schema du document à la collection tweets
const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;
