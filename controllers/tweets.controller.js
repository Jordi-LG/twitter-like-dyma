exports.tweetList = async (req, res, next) => {
  Tweet.find({})
    .exec()
    .then((tweets) => {
      res.render("tweets/tweet-list", { tweets });
    })
    .catch((err) => console.log(err));
};

exports.tweetNew = async (req, res, next) => {
  res.render("tweets/tweet-form");
};

exports.tweetCreate = async (req, res, next) => {
  const body = req.body;
  const newTweet = new Tweet(body);

  newTweet
    .save()
    .then((newTweet) => res.redirect("/"))
    .catch((err) => {
      const errors = Object.keys(err.errors).map(
        (key) => err.errors[key].message
      );
      res.status(400).render("tweets/tweet-form", { errors });
    });
};
