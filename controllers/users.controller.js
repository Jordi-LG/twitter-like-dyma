const {
  createUser,
  findUserPerUsername,
  searchUserPerUsername,
  findUserPerId,
  addUserIdToCurrentUserFollowing,
  removeUserIdToCurrentUserFollowing,
} = require("../queries/users.queries");
const { getUserTweetsFromAuthorId } = require("../queries/tweets.queries");
const path = require("path");
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../public/img/avatars"));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

exports.signupForm = (req, res, next) => {
  res.render("users/user-form", {
    errors: null,
    isAuthenticated: req.isAuthenticated(),
    currentUser: req.user,
  });
};

exports.signup = async (req, res, next) => {
  const body = req.body;
  try {
    const newUser = await createUser(body);
    res.redirect("/");
  } catch (e) {
    res.render("users/user-form", {
      errors: [e.message],
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  }
};

// 2 middlewares executés l'un après l'autre
exports.uploadImage = [
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      const user = req.user;
      user.avatar = `/img/avatars/${req.file.filename}`;
      await user.save();
      res.redirect("/tweets");
    } catch (e) {
      next(e);
    }
  },
];

exports.userProfile = async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = await findUserPerUsername(username);
    const tweets = await getUserTweetsFromAuthorId(user._id);
    res.render("tweets/tweet", {
      tweets,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
      user,
      editable: req.user._id.toString() === user._id.toString() ? true : false,
    });
  } catch (e) {
    next(e);
  }
};

exports.userList = async (req, res, next) => {
  try {
    const search = req.query.search;
    const users = await searchUserPerUsername(search);
    console.log(users);
    res.render("includes/search-menu", { users });
  } catch (e) {
    next(e);
  }
};

exports.followUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const [, user] = await Promise.all([
      addUserIdToCurrentUserFollowing(req.user, userId),
      findUserPerId(userId),
    ]);
    res.redirect(`/users/${user.username}`);
  } catch (e) {
    next(e);
  }
};

exports.unfollowUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const [, user] = await Promise.all([
      removeUserIdToCurrentUserFollowing(req.user, userId),
      findUserPerId(userId),
    ]);
    res.redirect(`/users/${user.username}`);
  } catch (e) {
    next(e);
  }
};
